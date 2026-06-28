# std::basic_string&lt;CharT,Traits,Allocator&gt;::find_first_of

```cpp
size_type find_first_of( const basic_string& str, size_type pos = 0 ) const; | (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type find_first_of( const CharT* s,
size_type pos, size_type count ) const; | (2) | (constexpr desde C++20)
size_type find_first_of( const CharT* s, size_type pos = 0 ) const; | (3) | (constexpr desde C++20)
size_type find_first_of( CharT ch, size_type pos = 0 ) const; | (4) | (noexcept desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
size_type
find_first_of( const StringViewLike& t,
size_type pos = 0 ) const noexcept(/* see below */);  // (5) (desde C++17)
(constexpr desde C++20)
```

Encontra o primeiro caractere igual a um dos caracteres na sequência de caracteres fornecida. A busca considera apenas o range `[`pos`, `[size()](<#/doc/string/basic_string/size>)`)`. Se nenhum dos caracteres na sequência de caracteres fornecida estiver presente no range, [npos](<#/doc/string/basic_string/npos>) será retornado.

1) Encontra o primeiro caractere igual a um dos caracteres em str.

2) Encontra o primeiro caractere igual a um dos caracteres no range `[`s`, `s + count`)`. Este range pode incluir caracteres nulos.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Encontra o primeiro caractere igual a um dos caracteres na string de caracteres apontada por s. O comprimento da string é determinado pelo primeiro caractere nulo usando Traits::length(s).

Se `[`s`, `s + Traits::length(s)`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

4) Encontra o primeiro caractere igual a ch.

5) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então encontra o primeiro caractere igual a um dos caracteres em sv.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

### Parâmetros

- **str** — string que identifica caracteres a serem buscados
- **pos** — posição na qual iniciar a busca
- **count** — comprimento da string de caracteres que identifica caracteres a serem buscados
- **s** — ponteiro para uma string de caracteres que identifica caracteres a serem buscados
- **ch** — caractere a ser buscado
- **t** — objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) que identifica caracteres a serem buscados

### Valor de retorno

Posição do caractere encontrado ou [npos](<#/doc/string/basic_string/npos>) se nenhum caractere for encontrado.

### Exceções

1,4) Não lança exceções.

5)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Notas

Traits::eq() é usado para realizar a comparação.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
        std::string::size_type sz;
    
        // (1)
        sz = "alignas"s.find_first_of("klmn"s);
        //     └────────────────────────┘
        assert(sz == 1);
    
        sz = "alignof"s.find_first_of("wxyz"s);
        // no match
        assert(sz == std::string::npos);
    
        // (2)
        sz = "consteval"s.find_first_of("xyzabc", 0, 3);
        // no match (× are not targets)     ×××
        assert(sz == std::string::npos);
    
        sz = "consteval"s.find_first_of("xyzabc", 0, 6);
        //    └───────────────────────────────┘
        assert(sz == 0);
    
        // (3)
        sz = "decltype"s.find_first_of("xyzabc");
        //      └────────────────────────────┘
        assert(sz == 2);
    
        // (4)
        sz = "co_await"s.find_first_of('a');
        //       └──────────────────────┘
        assert(sz == 3);
    
        // (5)
        sz = "constinit"s.find_first_of("int"sv);
        //      └─────────────────────────┘
        assert(sz == 2);
    
        std::cout << "All tests passed.\n";
    }
```

Saída:
```
    All tests passed.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11 | sobrecargas (3,4) eram noexcept | removido
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | sobrecarga (5) causava ambiguidade em alguns casos | evitado tornando-a um template
[P1148R0](<https://wg21.link/P1148R0>) | C++11
C++17 | noexcept para as sobrecargas (4,5) foi acidentalmente removido por LWG2064/LWG2946 | restaurado

### Veja também

[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida
(public member function)
[ rfind](<#/doc/string/basic_string/rfind>) | encontra a última ocorrência de uma substring
(public member function)
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) | encontra a primeira ausência de caracteres
(public member function)
[ find_last_of](<#/doc/string/basic_string/find_last_of>) | encontra a última ocorrência de caracteres
(public member function)
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) | encontra a última ausência de caracteres
(public member function)
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres
(public member function of `std::basic_string_view<CharT,Traits>`)
[ strspn](<#/doc/string/byte/strspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres encontrados em outra string de bytes
(function)