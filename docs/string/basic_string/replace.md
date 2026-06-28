# std::basic_string&lt;CharT,Traits,Allocator&gt;::replace

```cpp
basic_string& replace( size_type pos, size_type count,
const basic_string& str ); |  (1)  |  (constexpr desde C++20)
basic_string& replace( const_iterator first, const_iterator last,
const basic_string& str ); |  (2)  |  (constexpr desde C++20)
  // (3)
basic_string& replace( size_type pos, size_type count,
const basic_string& str,
size_type pos2, size_type count2 );  // (até C++14)
basic_string& replace( size_type pos, size_type count,
const basic_string& str,
size_type pos2, size_type count2 = npos );  // (desde C++14)
(constexpr desde C++20)
basic_string& replace( size_type pos, size_type count,
const CharT* cstr, size_type count2 ); |  (4)  |  (constexpr desde C++20)
basic_string& replace( const_iterator first, const_iterator last,
const CharT* cstr, size_type count2 ); |  (5)  |  (constexpr desde C++20)
basic_string& replace( size_type pos, size_type count,
const CharT* cstr ); |  (6)  |  (constexpr desde C++20)
basic_string& replace( const_iterator first, const_iterator last,
const CharT* cstr ); |  (7)  |  (constexpr desde C++20)
basic_string& replace( size_type pos, size_type count,
size_type count2, CharT ch ); |  (8)  |  (constexpr desde C++20)
basic_string& replace( const_iterator first, const_iterator last,
size_type count2, CharT ch ); |  (9)  |  (constexpr desde C++20)
template< class InputIt >
basic_string& replace( const_iterator first, const_iterator last,
InputIt first2, InputIt last2 ); |  (10)  |  (constexpr desde C++20)
basic_string& replace( const_iterator first, const_iterator last,
std::initializer_list<CharT> ilist );  // (11) (desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& replace( size_type pos, size_type count,
const StringViewLike& t );  // (12) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& replace( const_iterator first, const_iterator last,
const StringViewLike& t );  // (13) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
basic_string& replace( size_type pos, size_type count,
const StringViewLike& t,
size_type pos2, size_type count2 = npos );  // (14) (desde C++17)
(constexpr desde C++20)
```

  
Substitui os caracteres no range `[`begin() + pos`, `begin() + [std::min](<#/doc/algorithm/min>)(pos + count, size())`)` ou `[`first`, `last`)` pelos caracteres fornecidos.

1,2) Esses caracteres são substituídos por str.

3) Esses caracteres são substituídos por uma substring `[`pos2`, `[std::min](<#/doc/algorithm/min>)(pos2 + count2, str.size())`)` de str.

4,5) Esses caracteres são substituídos pelos caracteres no range `[`cstr`, `cstr + count2`)`.

Se `[`cstr`, `cstr + count2`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

6,7) Esses caracteres são substituídos pelos caracteres no range `[`cstr`, `cstr + Traits::length(cstr)`)`.

8,9) Esses caracteres são substituídos por count2 cópias de ch.

10) Esses caracteres são substituídos pelos caracteres no range `[`first2`, `last2`)` como se por replace(first, last, basic_string(first2, last2, get_allocator())).

11) Esses caracteres são substituídos pelos caracteres em ilist.

12,13) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então esses caracteres são substituídos pelos caracteres de sv.

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

14) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então esses caracteres são substituídos pelos caracteres do subview sv.substr(pos2, count2).

Essa sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

Se `[`begin()`, `first`)` ou `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido. 

### Parâmetros

pos  |  \-  |  início da substring que será substituída   
---|---|---
count  |  \-  |  comprimento da substring que será substituída   
first, last  |  \-  |  range de caracteres que será substituído   
str  |  \-  |  string a ser usada para substituição   
pos2  |  \-  |  início da substring para substituir   
count2  |  \-  |  número de caracteres para substituir   
cstr  |  \-  |  ponteiro para a string de caracteres a ser usada para substituição   
ch  |  \-  |  valor do caractere a ser usado para substituição   
first2, last2  |  \-  |  range de caracteres a ser usado para substituição   
ilist  |  \-  |  initializer list com os caracteres a serem usados para substituição   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) com os caracteres a serem usados para substituição   
Requisitos de tipo   
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Valor de retorno

*this. 

### Exceções

1) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos > size().

3) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos > size() ou pos2 > str.size().

4,6,8) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos > size().

12,14) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos > size().

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>). 

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 1323](<https://cplusplus.github.io/LWG/issue1323>) | C++98  | os tipos de first e last eram `iterator` | alterado para `const_iterator`  
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | as sobrecargas (12,13) causavam ambiguidade em alguns casos  | evitado tornando-as templates   
  
### Veja também

[ replace_with_range](<#/doc/string/basic_string/replace_with_range>)(C++23) |  substitui uma porção especificada de uma string por um range de caracteres   
(função membro pública)  
[ regex_replace](<#/doc/regex/regex_replace>)(C++11) |  substitui ocorrências de uma expressão regular por texto de substituição formatado   
(template de função)  
[ replacereplace_if](<#/doc/algorithm/replace>) |  substitui todos os valores que satisfazem critérios específicos por outro valor   
(template de função)