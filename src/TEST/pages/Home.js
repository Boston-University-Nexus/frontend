import CalendarSection from '../containers/CalendarSection'
import ClassSearch from '../containers/ClassSearch'
import Recommended from '../containers/Recommended'
import CourseSearchBar from '../components/CourseSearchBar'

const Planner = () => {
    return (
        <>
            <CourseSearchBar />
            <div className="h-5-6-custom grid grid-cols-4 gap-4 mt-5 font-sans">
                <ClassSearch />
                <Recommended />
                <CalendarSection />
            </div>
        </>
    )
}

export default Planner
