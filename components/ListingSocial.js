import { CardContent, Typography } from '@material-ui/core';
import { ContactPhone, Facebook, Instagram, Language, LocationOn, WhatsApp } from '@material-ui/icons';

const ListingSocial = ({ listing }) => {
  return (
    <Typography variant="body2">

      { listing.telePhone && (
        <>
          <a href={`tel: ${listing.telePhone}`}>
            <ContactPhone style={{ verticalAlign: `middle` }}/> { listing.telePhone }
          </a>
          <br/>
        </>
      )}

      { listing.facebook && (
          <>
            <a href={listing.facebook}>
              <Facebook style={{ verticalAlign: `middle` }}/> { listing.facebook }
            </a>
            <br/>
          </>
      )}

      { listing.instagram && (
        <>
          <a href={listing.instagram}>
            <Instagram style={{ verticalAlign: `middle` }}/> { listing.instagram }
          </a>
          <br/>
        </>
      )}

      { listing.plusCode && (
        <>
          <a href={`https://plus.codes/${location.plusCode}`}>
            <LocationOn style={{ verticalAlign: `middle` }}/> { listing.plusCode }
          </a>
          <br/>
        </>
      )}

      { listing.website && (
        <>
          <a href={listing.website}>
            <Language style={{ verticalAlign: `middle` }}/> { listing.website }
          </a>
          <br/>
        </>
      )}

      { listing.whatsApp && (
        <>
          <a href={`https://api.whatsapp.com/send?phone=${listing.whatsApp}`} target="_blank">
            <WhatsApp style={{ verticalAlign: `middle` }}/> { listing.whatsApp }
          </a>
          <br/>
        </>
      )}

    </Typography>
  )
}

export default ListingSocial;
