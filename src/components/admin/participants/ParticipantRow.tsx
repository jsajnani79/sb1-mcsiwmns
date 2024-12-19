{/* Previous imports remain the same */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            participant.attended === true
              ? 'bg-green-100 text-green-800'
              : participant.attended === false
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {participant.attended === true
              ? 'Complete'
              : participant.attended === false
              ? 'Incomplete'
              : 'Pending'}
          </span>
{/* Rest of the file remains the same */}