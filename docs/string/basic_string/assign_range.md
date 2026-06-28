# std::basic_string&lt;CharT,Traits,Allocator&gt;::assign_range

```cpp
template< container-compatible-range<CharT> R >
constexpr std::basic_string& assign_range( R&& rg );  // (desde C++23)
```

  
Substitui o conteúdo da string pelos valores no range `rg`.

Equivalente a
```
    return assign(
        std::basic_string(
            std::from_range,
            std​::​forward<R>(rg),
            get_allocator())
    );
```

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>)  
  
### Valor de retorno

*this

### Complexidade

Linear no tamanho de `rg`.

### Exceções

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | funções membro que aceitam [range compatível com container](<#/doc/ranges/to>)  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <string>
     
    int main()
    {
        const auto source = {'s', 'o', 'u', 'r', 'c', 'e'};
        std::string destination{"destination"};
     
    #ifdef __cpp_lib_containers_ranges
        destination.assign_range(source);
    #else
        destination.assign(source.begin(), source.end());
    #endif
     
        assert(destination == "source");
    }
```

### Veja também

[ assign](<#/doc/string/basic_string/assign>) |  atribui caracteres a uma string   
(função membro pública)  
[ operator=](<#/>) |  atribui valores à string   
(função membro pública)  
[ (constructor)](<#/doc/string/basic_string/basic_string>) |  constrói um `basic_string`   
(função membro pública)