"""Rebuild the linked CV from career details and website publications."""
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, HRFlowable

ROOT = Path(__file__).resolve().parents[1]


class EntryParagraph(Paragraph):
    def split(self, available_width, available_height):
        return []


FONT_DIR = Path('/System/Library/Fonts/Supplemental')
for name, filename in [('Times-Roman', 'Times New Roman.ttf'), ('Times-Bold', 'Times New Roman Bold.ttf'), ('Times-Italic', 'Times New Roman Italic.ttf'), ('Times-BoldItalic', 'Times New Roman Bold Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / filename)))
pdfmetrics.registerFontFamily('Times-Roman', normal='Times-Roman', bold='Times-Bold', italic='Times-Italic', boldItalic='Times-BoldItalic')


def build():
    site = (ROOT / 'index.html').read_text()
    story = []
    body = ParagraphStyle('body', fontName='Times-Roman', fontSize=11, leading=14, spaceAfter=8)
    heading = ParagraphStyle('section', parent=body, fontName='Times-Bold', spaceBefore=12, spaceAfter=4, keepWithNext=True)
    center = ParagraphStyle('center', parent=body, alignment=TA_CENTER, spaceAfter=2)

    def para(text, style=body):
        story.append(EntryParagraph(text, style))

    def section(title):
        para(title, heading)
        rule = HRFlowable(width='100%', thickness=0.8, color=colors.black, spaceAfter=7)
        rule.keepWithNext = True
        story.append(rule)

    para('Sarah Hancock, Ph.D.', ParagraphStyle('name', parent=center, fontName='Times-Bold', fontSize=18, leading=22))
    para('Santa Cruz, California | sarahhancock@seas.harvard.edu', center)
    para('<link href="https://sarahhancock.github.io">sarahhancock.github.io</link>', center)
    para('<i>Updated November 20, 2026</i>', center)
    section('EDUCATION')
    para('<b>Harvard University</b> | 2026<br/>Ph.D., Environmental Science and Engineering<br/>Advisor: Dr. Daniel J. Jacob')
    para('<b>Columbia University</b> | 2017 - 2021<br/>Bachelor of Science, Computer Science')
    section('RESEARCH EXPERIENCE')
    para('<b>Staff Researcher, Harvard University</b> | May 2026 - Present<br/>Atmospheric Chemistry Modeling Group, Daniel J. Jacob<br/>Based in Santa Cruz, California')
    para('<b>NSF Graduate Research Fellow, Harvard University</b> | August 2021 - May 2026<br/>Advisor: Dr. Daniel J. Jacob')
    para('<b>Research Assistant, Lamont-Doherty Earth Institute</b> | May 2020 - October 2021<br/>Advisors: Dr. Arlene M. Fiore, Dr. Daniel M. Westervelt')
    publications = site.split('<section id="publications">', 1)[1].split('</section>', 1)[0]
    first, co = publications.split('<h3>Co-Author</h3>', 1)
    for title, block in [('FIRST-AUTHOR PUBLICATIONS', first), ('CO-AUTHOR PUBLICATIONS', co)]:
        section(title)
        for citation in re.findall(r'<p>(.*?)</p>', block, re.S):
            citation = re.sub(r'\s+', ' ', citation).strip()
            citation = re.sub(r'<a href="([^"]+)">(.*?)</a>', r'<link href="\1" color="#315b85">\2</link>', citation)
            para(citation)
        if title == 'FIRST-AUTHOR PUBLICATIONS':
            section('HONORS AND GRANTS')
            for award in [
                '2025 American Meteorological Society Best Student Presentation Award',
                '2023 Harvard Teaching Staff Special Recognition',
                '2022 NSF Graduate Research Fellowship (GRFP)',
                '2022 Harvard Winston Chen Family Graduate Fellowship',
                '2021 Harvard University Graduate Prize Fellowship',
                '2021 American Meteorological Society Graduate Fellowship',
                '2020, 2021 Columbia University Earth Institute Collaborative Research Grant',
            ]:
                para(award)

    section('SELECTED PRESENTATIONS')
    talks = site.split('<section id="presentations">', 1)[1].split('</section>', 1)[0]
    for talk in re.findall(r'<p>(.*?)</p>', talks, re.S):
        para(re.sub(r'\s+', ' ', talk).strip())

    section('TEACHING EXPERIENCE')
    for text in [
        '<b>Harvard University</b><br/>Derek Bok Center for Education &amp; Learning Teaching Certificate | July 2025<br/>SCIENCE 5, Introduction to Computation, Teaching Fellow | Spring 2023, Spring 2024<br/>EPS 200, Atmospheric Chemistry, Teaching Fellow and Guest Lecturer | Fall 2023',
        '<b>Children\'s Creativity Museum</b><br/>Senior Education Intern | May 2020 - September 2020<br/>Education Intern | May 2019 - September 2019',
        '<b>Columbia University Center for Student Advising</b><br/>Computer Science Tutor | January 2020 - May 2020',
        '<b>Harlem Grown</b><br/>Farm Education Intern | August 2018 - May 2019',
        '<b>Columbia Tutoring and Learning Center</b><br/>Mathematics Tutor | September 2017 - May 2018',
    ]:
        para(text)
    section('RESEARCH MENTORSHIP')
    para('Sophie Farr (Summer 2024), "Quantifying methane emissions in Oman with inversion of satellite observations." Presented at AGU Fall Meeting (2024). Co-mentored.')
    para('Alex Oort Alonso (Summer 2023), "High Resolution Methane Emissions in India and Bangladesh Inferred From an Iterated Inversion with 2022-2023 TROPOMI Data." Presented at AGU Fall Meeting (2023), co-author on Estrada et al. (2025). Co-mentored.')
    section('LEADERSHIP')
    para('<b>Harvard Atmospheric Chemistry Modeling Group</b><br/>Community Outreach Co-Leader | May 2024 - May 2026')
    para('<b>Harvard Atmospheric Chemistry Journal Club</b><br/>Co-Organizer | April 2023 - September 2024')

    def footer(canvas, doc):
        canvas.setFont('Times-Roman', 9)
        canvas.drawRightString(540, 35, f'Sarah Hancock | {doc.page}')

    SimpleDocTemplate(str(ROOT / 'files/Hancock_CV.pdf'), pagesize=(612, 792), rightMargin=54, leftMargin=54, topMargin=42, bottomMargin=48, title='Sarah Hancock - Curriculum Vitae', author='Sarah Hancock').build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == '__main__':
    build()
