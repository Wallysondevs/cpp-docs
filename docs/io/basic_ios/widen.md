```cpp
# std::basic_ios<CharT,Traits>::widen

char_type widen( char c ) const; |  |   
---|---|---  
| |   
  
Converte um caractere c para seu equivalente na localidade atual. O resultado é convertido de char para o tipo de caractere usado dentro do stream, se necessário.

Efetivamente chama std::use_facet< std::ctype<char_type> >(getloc()).widen(c).

### Parâmetros

c  |  \-  |  caractere a converter   
---|---|---  
  
### Valor de retorno

Caractere convertido para `char_type`

### Veja também

 narrow |  estreita caracteres   
(função membro pública)  
---|---  
 do_widen[virtual] |  converte um caractere ou caracteres de char para `CharT`   
(função membro protegida virtual de `std::ctype<CharT>`)  
 btowc |  alarga um caractere estreito de byte único para caractere largo, se possível   
(função)
```