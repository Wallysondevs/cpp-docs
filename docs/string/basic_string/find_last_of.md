# std::basic_string&lt;CharT,Traits,Allocator&gt;::find_last_of

```cpp
size_type find_last_of( const basic_string& str,
size_type pos = npos ) const; |  (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type find_last_of( const CharT* s,
size_type pos, size_type count ) const; |  (2) | (constexpr desde C++20)
size_type find_last_of( const CharT* s, size_type pos = npos ) const; |  (3) | (constexpr desde C++20)
size_type find_last_of( CharT ch, size_type pos = npos ) const; |  (4) | (noexcept desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
size_type
find_last_of( const StringViewLike& t,
size_type pos = npos ) const noexcept(/* see below */);  // (5) (desde C++17)
(constexpr desde C++20)
```

  
Encontra o último caractere igual a um dos caracteres na sequência de caracteres fornecida. O algoritmo de busca exato não é especificado. A busca considera apenas o range `[`​0​`, `pos`]`. Se nenhum dos caracteres na sequência de caracteres fornecida estiver presente no range, [npos](<#/doc/string/basic_string/npos>) será retornado. 

1) Encontra o último caractere igual a um dos caracteres em str.

2) Encontra o último caractere igual a um dos caracteres no range `[`s`, `s + count`)`. Este range pode incluir caracteres nulos.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Encontra o último caractere igual a um dos caracteres na string de caracteres apontada por s. O comprimento da string é determinado pelo primeiro caractere nulo usando Traits::length(s).

Se `[`s`, `s + Traits::length(s)`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

4) Encontra o último caractere igual a ch.

5) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então encontra o último caractere igual a um dos caracteres em sv.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

Em todos os casos, a igualdade é verificada chamando [`Traits::eq`](<#/doc/string/char_traits/cmp>). 

### Parâmetros

str  |  \-  |  string que identifica os caracteres a serem buscados   
---|---|---
pos  |  \-  |  posição na qual a busca deve terminar   
count  |  \-  |  comprimento da string de caracteres que identifica os caracteres a serem buscados   
s  |  \-  |  ponteiro para uma string de caracteres que identifica os caracteres a serem buscados   
ch  |  \-  |  caractere a ser buscado   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) que identifica os caracteres a serem buscados   
  
### Valor de retorno

Posição do caractere encontrado ou [npos](<#/doc/string/basic_string/npos>) se nenhum caractere for encontrado. 

### Exceções

1,4) Não lança exceções.

5)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Run this code
```cpp 
    #include <iostream>
    #include <string>
     
    int main()
    {
        const std::string path = "/root/config";
        auto const pos = path.find_last_of('/');
        const auto leaf = path.substr(pos + 1);
     
        std::cout << leaf << '\n';
    }
```

Saída: 
```
    config
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 141](<https://cplusplus.github.io/LWG/issue141>) | C++98  | a sobrecarga (1) só podia retornar [npos](<#/doc/string/basic_string/npos>) se pos >= size() | o range de busca é  
`[`​0​`, `size()`)` neste caso   
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte
---|---|---|---
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11  | as sobrecargas (3,4) eram noexcept  | removido   
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | a sobrecarga (5) causava ambiguidade em alguns casos  | evitado tornando-a um template   
[P1148R0](<https://wg21.link/P1148R0>) | C++11  
C++17  | noexcept para as sobrecargas (4,5) foi  
acidentalmente removido por LWG2064/LWG2946  | restaurado   
  
### Veja também

[ find](<#/doc/string/basic_string/find>) |  encontra a primeira ocorrência da substring fornecida   
(função membro pública)  
[ rfind](<#/doc/string/basic_string/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) |  encontra a primeira ausência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) |  encontra a última ausência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) |  encontra a última ocorrência de caracteres   
(função membro pública de `std::basic_string_view<CharT,Traits>`)