# std::basic_string_view&lt;CharT,Traits&gt;::rfind

```cpp
constexpr size_type rfind( basic_string_view v, size_type pos = npos ) const noexcept;  // (1) (desde C++17)
constexpr size_type rfind( CharT ch, size_type pos = npos ) const noexcept;  // (2) (desde C++17)
constexpr size_type rfind( const CharT* s, size_type pos, size_type count ) const;  // (3) (desde C++17)
constexpr size_type rfind( const CharT* s, size_type pos = npos ) const;  // (4) (desde C++17)
```

  
Encontra a última substring que é igual à sequência de caracteres fornecida. A busca começa em `pos` e prossegue da direita para a esquerda (assim, a substring encontrada, se houver, não pode começar em uma posição posterior a `pos`). Se [npos](<#/doc/string/basic_string_view/npos>) ou qualquer valor não menor que [size()](<#/doc/string/basic_string_view/size>) - 1 for passado como `pos`, a string inteira será buscada. 

1) Encontra a última ocorrência de `v` nesta view, começando na posição `pos`.

2) Equivalente a rfind(basic_string_view([std::addressof](<#/doc/memory/addressof>)(ch), 1), pos).

3) Equivalente a rfind(basic_string_view(s, count), pos).

4) Equivalente a rfind(basic_string_view(s), pos).

### Parâmetros

v  |  \-  |  view a ser buscada   
---|---|---
pos  |  \-  |  posição onde iniciar a busca   
count  |  \-  |  comprimento da substring a ser buscada   
s  |  \-  |  ponteiro para uma string de caracteres a ser buscada   
ch  |  \-  |  caractere a ser buscado   
  
### Valor de retorno

Posição do primeiro caractere da substring encontrada ou [npos](<#/doc/string/basic_string_view/npos>) se nenhuma substring for encontrada. 

### Complexidade

O([size()](<#/doc/string/basic_string_view/size>) * v.[size()](<#/doc/string/basic_string_view/size>)) no pior caso. 

### Exemplo

Execute este código
```cpp
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
        constexpr auto N = std::string_view::npos;
    
        static_assert(true
            && (6 == "AB AB AB"sv.rfind("AB"))
            && (6 == "AB AB AB"sv.rfind("ABCD", N, 2))
            && (3 == "AB AB AB"sv.rfind("AB", 5))
            && (0 == "AB CD EF"sv.rfind("AB", 0))
            && (2 == "B AB AB "sv.rfind("AB", 2))
            && (N == "B AB AB "sv.rfind("AB", 1))
            && (5 == "B AB AB "sv.rfind('A'))
            && (4 == "AB AB AB"sv.rfind('B', 4))
            && (N == "AB AB AB"sv.rfind('C'))
        );
    }
```

### Veja também

[ find](<#/doc/string/basic_string_view/find>) |  encontra caracteres na view   
(public member function)  
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(public member function)  
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) |  encontra a última ocorrência de caracteres   
(public member function)  
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) |  encontra a primeira ausência de caracteres   
(public member function)  
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) |  encontra a última ausência de caracteres   
(public member function)  
[ rfind](<#/doc/string/basic_string/rfind>) |  encontra a última ocorrência de uma substring   
(public member function of `std::basic_string<CharT,Traits,Allocator>`)