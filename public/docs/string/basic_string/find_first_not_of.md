# std::basic_string&lt;CharT,Traits,Allocator&gt;::find_first_not_of

```cpp
size_type find_first_not_of( const basic_string& str,
size_type pos = 0 ) const; |  (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type find_first_not_of( const CharT* s,
size_type pos, size_type count ) const; |  (2) | (constexpr desde C++20)
size_type find_first_not_of( const CharT* s,
size_type pos = 0 ) const; |  (3) | (constexpr desde C++20)
size_type find_first_not_of( CharT ch, size_type pos = 0 ) const; |  (4) | (noexcept desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
size_type
find_first_not_of( const StringViewLike& t,
size_type pos = 0 ) const noexcept(/* see below */);  // (5) (desde C++17)
(constexpr desde C++20)
```

  
Encontra o primeiro caractere que não é igual a nenhum dos caracteres na sequência de caracteres fornecida. A busca considera apenas o range `[`pos`, `[size()](<#/doc/string/basic_string/size>)`)`. Se todos os caracteres no range puderem ser encontrados na sequência de caracteres fornecida, [npos](<#/doc/string/basic_string/npos>) será retornado. 

1) Encontra o primeiro caractere que não é igual a nenhum dos caracteres em str.

2) Encontra o primeiro caractere que não é igual a nenhum dos caracteres no range `[`s`, `s + count`)`. Este range pode incluir caracteres nulos.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Encontra o primeiro caractere que não é igual a nenhum dos caracteres na string de caracteres apontada por s. O comprimento da string é determinado pelo primeiro caractere nulo usando `Traits::length(s)`.

Se `[`s`, `s + Traits::length(s)`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

4) Encontra o primeiro caractere que não é igual a ch.

5) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então encontra o primeiro caractere que não é igual a nenhum dos caracteres em sv.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

Em todos os casos, a igualdade é verificada chamando [`Traits::eq`](<#/doc/string/char_traits/cmp>). 

### Parâmetros

str  |  \-  |  string que identifica os caracteres a serem buscados   
---|---|---
pos  |  \-  |  posição de onde a busca deve começar   
count  |  \-  |  comprimento da string de caracteres que identifica os caracteres a serem buscados   
s  |  \-  |  ponteiro para uma string de caracteres que identifica os caracteres a serem buscados   
ch  |  \-  |  caractere que identifica os caracteres a serem buscados   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) que identifica os caracteres a serem buscados   
  
### Valor de retorno

Posição do caractere encontrado ou [std::string::npos](<#/doc/string/basic_string/npos>) se nenhum caractere for encontrado. 

### Exceções

1,4) Não lança exceções.

5)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        // Permit uppercase letters, lowercase letters and numbers in macro names
        const char* pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                              "abcdefghijklmnopqrstuvwxyz"
                              "0123456789";
     
        std::string data = "1) %FIX, 2) %HACK, and 3) %TODO";
        const std::string replacement = "%DONE%";
     
        std::cout << "Before: " << data << '\n';
     
        for (std::string::size_type first{}, last{};
            (first = data.find('%', first)) != std::string::npos;
            first += replacement.size())
        {
            last = data.find_first_not_of(pattern, first + 1);
            if (last == std::string::npos)
                last = data.length();
     
            // Now first at '%' and last is one past end of the found substring
            data.replace(first, last - first, replacement);
        }
     
        std::cout << "After: " << data << '\n';
    }
```

Output: 
```
    Before: 1) %FIX, 2) %HACK, and 3) %TODO
    After: 1) %DONE%, 2) %DONE%, and 3) %DONE%
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11  | sobrecargas (3,4) eram noexcept  | removido   
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | sobrecarga (5) causava ambiguidade em alguns casos  | evitado tornando-a um template   
[P1148R0](<https://wg21.link/P1148R0>) | C++11  
C++17  | noexcept para as sobrecargas (4,5) foi acidentalmente removido por LWG2064/LWG2946  | restaurado   
  
### Veja também

[ find](<#/doc/string/basic_string/find>) |  encontra a primeira ocorrência da substring fornecida   
(função membro pública)  
[ rfind](<#/doc/string/basic_string/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string/find_last_of>) |  encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) |  encontra a última ausência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) |  encontra a primeira ausência de caracteres   
(função membro pública de `std::basic_string_view<CharT,Traits>`)