import {
    Listbox as HListBox, ListboxButton, ListboxOption, ListboxOptions,
} from '@headlessui/react'
import { useState } from 'react'

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

export const ListBox = () => {
    const [selectedPerson, setSelectedPerson] = useState(people[0])

    return (
        <HListBox value={selectedPerson} onChange={setSelectedPerson}>
            <ListboxButton>{selectedPerson.name}</ListboxButton>
            <ListboxOptions anchor="bottom">
                {people.map((person) => (
                    <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
                        {person.name}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </HListBox>
    )
}
