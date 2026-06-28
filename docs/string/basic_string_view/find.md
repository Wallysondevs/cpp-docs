# std::basic_string_view&lt;CharT,Traits&gt;::find

```cpp
constexpr size_type find( basic_string_view v, size_type pos = 0 ) const noexcept;  // (1) (desde C++17)
constexpr size_type find( CharT ch, size_type pos = 0 ) const noexcept;  // (2) (desde C++17)
constexpr size_type find( const CharT* s, size_type pos, size_type count ) const;  // (3) (desde C++17)
constexpr size_type find( const CharT* s, size_type pos = 0 ) const;  // (4) (desde C++17)
```

  
Encontra a primeira substring igual à sequência de caracteres fornecida.

1) Encontra a primeira ocorrência de v nesta view, começando na posição pos.

2) Equivalente a find(basic_string_view([std::addressof](<#/doc/memory/addressof>)(ch), 1), pos).

3) Equivalente a find(basic_string_view(s, count), pos).

4) Equivalente a find(basic_string_view(s), pos).

### Parâmetros

v  |  \-  |  view a ser procurada   
---|---|---
pos  |  \-  |  posição onde iniciar a busca   
count  |  \-  |  comprimento da substring a ser procurada   
s  |  \-  |  ponteiro para uma string de caracteres a ser procurada   
ch  |  \-  |  caractere a ser procurado   
  
### Valor de retorno

Posição do primeiro caractere da substring encontrada, ou [npos](<#/doc/string/basic_string_view/npos>) se nenhuma substring for encontrada.

### Complexidade

O([size()](<#/doc/string/basic_string_view/size>) * v.[size()](<#/doc/string/basic_string_view/size>)) no pior caso.

### Exemplo

Execute este código
```cpp
    #include <string_view>
    
    int main()
    {
        using namespace std::literals;
    
        constexpr auto str{" long long int;"sv};
    
        static_assert(
            1 == str.find("long"sv)            && "<- find(v , pos = 0)" &&
            6 == str.find("long"sv, 2)         && "<- find(v , pos = 2)" &&
            0 == str.find(' ')                 && "<- find(ch, pos = 0)" &&
            2 == str.find('o', 1)              && "<- find(ch, pos = 1)" &&
            2 == str.find("on")                && "<- find(s , pos = 0)" &&
            6 == str.find("long double", 5, 4) && "<- find(s , pos = 5, count = 4)"
        );
    
        static_assert(str.npos == str.find("float"));
    }
```

### Veja também

[ rfind](<#/doc/string/basic_string_view/rfind>) | encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres   
(função membro pública)  
[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)