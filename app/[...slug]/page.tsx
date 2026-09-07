import { notFound } from 'next/navigation';
import { courses, segments } from '@/lib/content';
import { articles } from '@/lib/articles';
import { paths, routeMetadata } from '@/lib/routes';
import { CoursesPage, CoursePage, AudiencesPage, SegmentPage, MethodPage, AboutPage, TestimonialsPage, PricingPage, BlogPage, ArticlePage, FaqPage, ContactPage } from '@/components/site-pages';
import { LegalPage } from '@/components/legal-pages';
import { BrandPage } from '@/components/brand-page';
export const dynamicParams=false;
export async function generateStaticParams(){return paths.filter(p=>p!=='/'&&p!=='/diagnostic').map(p=>({slug:p.slice(1).split('/')}));}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}){return routeMetadata((await params).slug.join('/'));}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const slug=(await params).slug.join('/');const simple:Record<string,React.ReactNode>={courses:<CoursesPage/>,'who-its-for':<AudiencesPage/>,'our-method':<MethodPage/>,about:<AboutPage/>,testimonials:<TestimonialsPage/>,pricing:<PricingPage/>,blog:<BlogPage/>,faq:<FaqPage/>,contact:<ContactPage/>,'brand-kit':<BrandPage/>};if(simple[slug])return simple[slug];if(['legal/terms','legal/privacy','legal/cookies'].includes(slug))return <LegalPage kind={slug.split('/')[1]}/>;let index=courses.findIndex(c=>'courses/'+c.slug===slug);if(index>=0)return <CoursePage index={index}/>;index=segments.findIndex(s=>'who-its-for/'+s.slug===slug);if(index>=0)return <SegmentPage index={index}/>;index=articles.findIndex(a=>'blog/'+a.slug===slug);if(index>=0)return <ArticlePage index={index}/>;notFound();}
