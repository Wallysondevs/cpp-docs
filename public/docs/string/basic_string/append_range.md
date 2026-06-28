# std::basic_string&lt;CharT,Traits,Allocator&gt;::append_range

```cpp
template< container-compatible-range<CharT> R >
constexpr std::basic_string& append_range( R&& rg );  // (desde C++23)
```

  
Anexa todos os caracteres do range rg.

Equivalente a
```
    return append(std::basic_string( std::from_range, std​::​forward<R>(rg), get_allocator()));
```

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>)  
  
### Valor de retorno

*this

### Complexidade

Linear no tamanho de rg.

### Exceções

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | funções membro que aceitam [range compatível com container](<#/doc/ranges/to>)  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <string>
     
    int main()
    {
        std::string head{"long long"};
        const auto tail = {' ', 'i', 'n', 't'};
     
    #ifdef __cpp_lib_containers_ranges
        head.append_range(tail);
    #else
        head.append(tail.begin(), tail.end());
    #endif
     
        assert(head == "long long int");
    }
```

### Veja também

[ append](<#/doc/string/basic_string/append>) | anexa caracteres ao final   
(função membro pública)  