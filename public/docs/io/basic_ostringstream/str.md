# std::basic_ostringstream&lt;CharT,Traits,Allocator&gt;::str

```cpp
  // (1)
std::basic_string<CharT, Traits, Allocator> str() const;  // (até C++20)
std::basic_string<CharT, Traits, Allocator> str() const&;  // (desde C++20)
template< class SAlloc >
std::basic_string<CharT, Traits, SAlloc> str( const SAlloc& a ) const;  // (2) (desde C++20)
std::basic_string<CharT, Traits, Allocator> str() &&;  // (3) (desde C++20)
void str( const std::basic_string<CharT, Traits, Allocator>& s );  // (4)
template< class SAlloc >
void str( const std::basic_string<CharT, Traits, SAlloc>& s );  // (5) (desde C++20)
void str( std::basic_string<CharT, Traits, Allocator>&& s );  // (6) (desde C++20)
template< class StringViewLike >
void str( const StringViewLike& t );  // (7) (desde C++26)
```

  
Gerencia o conteúdo do objeto string subjacente.

1) Retorna uma cópia da string subjacente. Equivalente a `return rdbuf()->str();`.

2) Retorna uma cópia da string subjacente, usando `a` como alocador. Equivalente a `return rdbuf()->str(a);`.

3) Retorna uma string construída por *move* a partir da string subjacente. Equivalente a `return std::move(*rdbuf()).str();`.

4,5) Substitui o conteúdo da string subjacente. Equivalente a `rdbuf()->str(s);`.

6) Substitui o conteúdo da string subjacente. Equivalente a `rdbuf()->str(std::move(s));`.

7) Substitui o conteúdo da string subjacente. Equivalente a `rdbuf()->str(t);`.

Esta sobrecarga participa da resolução de sobrecarga somente se `is_convertible_v<const T&, basic_string_view<charT, traits>>` for verdadeiro.

### Parâmetros

s  |  \-  |  novo conteúdo da string subjacente   
---|---|---
t  |  \-  |  um objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) para usar como o novo conteúdo da string subjacente   
a  |  \-  |  alocador usado para construir a string retornada   
  
### Valor de retorno

1,2) Uma cópia do objeto string subjacente.

3) Uma string construída por *move* a partir do objeto string subjacente.

4-7) (nenhum)

### Observações

A cópia da string subjacente retornada por [`str`](<#/doc/io/basic_ostringstream/str>) é um objeto temporário que será destruído ao final da expressão, então chamar diretamente [`c_str()`](<#/doc/string/basic_string/c_str>) no resultado de `str()` (por exemplo, em `auto *ptr = out.str().c_str();`) resulta em um ponteiro pendente.

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_sstream_from_string_view`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interfaceando [std::stringstream](<#/doc/io/basic_stringstream>)s com [std::string_view](<#/doc/string/basic_string_view>), ([7](<#/doc/io/basic_ostringstream/str>))  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        int n;
     
        std::istringstream in; // could also use in("1 2")
        in.str("1 2");
        in >> n;
        std::cout << "After reading the first int from \"1 2\", the int is "
                  << n << ", str() = \"" << in.str() << "\"\n";
     
        std::ostringstream out("1 2");
        out << 3;
        std::cout << "After writing the int '3' to output stream \"1 2\""
                  << ", str() = \"" << out.str() << "\"\n";
     
        std::ostringstream ate("1 2", std::ios_base::ate);
        ate << 3;
        std::cout << "After writing the int '3' to append stream \"1 2\""
                  << ", str() = \"" << ate.str() << "\"\n";
    }
```

Saída: 
```
    After reading the first int from "1 2", the int is 1, str() = "1 2"
    After writing the int '3' to output stream "1 2", str() = "3 2"
    After writing the int '3' to append stream "1 2", str() = "1 23"
```

### Veja também

[ rdbuf](<#/doc/io/basic_ostringstream/rdbuf>) | retorna o objeto de dispositivo de string bruto subjacente   
(função membro pública)  
[ str](<#/doc/io/basic_stringbuf/str>) | substitui ou obtém uma cópia da string de caracteres associada   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)