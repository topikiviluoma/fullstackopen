import React from 'react'
import {shallow} from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Auttoori'
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        const contentDiv = blogComponent.find('.content')

        expect(contentDiv.text()).toContain(blog.title)
    })
})