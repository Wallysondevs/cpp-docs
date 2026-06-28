# std::char_traits&lt;char&gt;::assign, std::char_traits&lt;wchar_t&gt;::assign, std::char_traits&lt;char8_t&gt;::assign, std::char_traits&lt;char16_t&gt;::assign, std::char_traits&lt;char32_t&gt;::assign

static void assign( char_type& c1, const char_type& c2 ); |  (1)  |  (noexcept desde C++11)  
(constexpr desde C++17)  
static char_type* assign( char_type* ptr, [std::size_t](<#/doc/types/size_t>) count, char_type c2 ); |  (2)  |  (constexpr desde C++20)  

  
1) Atribui c2 a c1, comportando-se identicamente a c1 = c2.

2) Atribui c2 a cada caractere em `count` caracteres na sequência de caracteres apontada por `ptr`.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caractere para `X::assign`. 

### Parâmetros

c1  |  \-  |  caractere para atribuir   
---|---|---
c2  |  \-  |  valor do caractere para atribuir   
ptr  |  \-  |  ponteiro para uma sequência de caracteres para atribuir   
count  |  \-  |  o comprimento da sequência de caracteres   
  
### Valor de retorno

1) (nenhum)

2) ptr

### Complexidade

1) Constante.

2) Linear em `count`.