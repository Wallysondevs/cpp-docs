# std::basic_string&lt;CharT,Traits,Allocator&gt;::rfind

```cpp
size_type rfind( const basic_string& str, size_type pos = npos ) const; |  (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type rfind( const CharT* s, size_type pos, size_type count ) const; |  (2) | (constexpr desde C++20)
size_type rfind( const CharT* s, size_type pos = npos ) const; |  (3) | (constexpr desde C++20)
size_type rfind( CharT ch, size_type pos = npos ) const; |  (4) | (noexcept desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
size_type rfind( const StringViewLike& t,
size_type pos = npos ) const noexcept(/* see below */);  // (5) (desde C++17)
(constexpr desde C++20)
```

  
Encontra a última substring que é igual à sequência de caracteres fornecida. A busca começa em pos e prossegue da direita para a esquerda (assim, a substring encontrada, se houver, não pode começar em uma posição posterior a pos). Se [npos](<#/doc/string/basic_string/npos>) ou qualquer valor não menor que [size()](<#/doc/string/basic_string/size>) - 1 for passado como pos, a string inteira será pesquisada. 

1) Encontra a última substring igual a str.

2) Encontra a última substring igual ao range `[`s`, `s + count`)`. Este range pode incluir caracteres nulos.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Encontra a última substring igual à string de caracteres apontada por s. O comprimento da string é determinado pelo primeiro caractere nulo usando Traits::length(s).

Se `[`s`, `s + Traits::length(s)`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

4) Encontra o último caractere igual a ch.

5) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então encontra a última substring igual ao conteúdo de sv.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for verdadeiro e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for falso.

Em todos os casos, a igualdade é verificada chamando [`Traits::eq`](<#/doc/string/char_traits/cmp>). 

### Parâmetros

str  |  \-  |  string a ser pesquisada   
---|---|---
pos  |  \-  |  posição na qual iniciar a busca   
count  |  \-  |  comprimento da substring a ser pesquisada   
s  |  \-  |  ponteiro para uma string de caracteres a ser pesquisada   
ch  |  \-  |  caractere a ser pesquisado   
t  |  \-  |  objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) a ser pesquisado   
  
### Valor de retorno

Posição do primeiro caractere da substring encontrada ou [npos](<#/doc/string/basic_string/npos>) se nenhuma substring for encontrada. Note que este é um offset do início da string, não do fim. 

Se a busca for por uma string vazia (ou seja, str.size(), count, ou Traits::length(s) for zero), a string vazia é encontrada imediatamente e `rfind` retorna: 

  * pos, se pos < size(); 
  * size() caso contrário, incluindo o caso onde pos == npos. 

Caso contrário, se [size()](<#/doc/string/basic_string/size>) for zero, [npos](<#/doc/string/basic_string/npos>) é sempre retornado. 

### Exceções

1,4) Não lança exceções.

5)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    void print(std::string::size_type n,
               std::string::size_type len,
               std::string const &s)
    {
        if (n == std::string::npos)
            std::cout << "not found\n";
        else
            std::cout << "found: " << std::quoted(s.substr(n, len)) << " at " << n << '\n';
    }
     
    int main()
    {
        std::string::size_type n;
        std::string const s = "This is a string";
     
        // search backwards from end of string
        n = s.rfind("is");
        print(n, 2, s);
     
        // search backwards from position 4
        n = s.rfind("is", 4);
        print(n, 2, s);
     
        // find a single character
        n = s.rfind('s');
        print(n, 1, s);
     
        // find a single character
        n = s.rfind('q');
        print(n, 1, s);
     
        // find the prefix (see also s.starts_with("This"))
        n = s.rfind("This", 0);
        print(n, 4, s);
    }
```

Saída: 
```
    found: "is" at 5
    found: "is" at 2
    found: "s" at 10
    not found
    found: "This" at 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98  | não havia garantia de segurança de exceção  | adicionada garantia de segurança de exceção forte   
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11  | sobrecargas (3,4) eram noexcept  | removido   
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17  | sobrecarga (5) causava ambiguidade em alguns casos  | evitado tornando-a um template   
[P1148R0](<https://wg21.link/P1148R0>) | C++11  
C++17  | noexcept para as sobrecargas (4,5) foi  
acidentalmente removido por LWG2064/LWG2946  | restaurado   
  
### Veja também

[ find](<#/doc/string/basic_string/find>) |  encontra a primeira ocorrência da substring fornecida   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) |  encontra a primeira ausência de caracteres   
(função membro pública)  
[ find_last_of](<find_last_of_html> "cpp/string/basic string/find last of") |  encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) |  encontra a última ausência de caracteres   
(função membro pública)  
[ rfind](<#/doc/string/basic_string_view/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública de `std::basic_string_view<CharT,Traits>`)