# std::basic_string&lt;CharT,Traits,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<CharT> R >
constexpr iterator insert_range( const_iterator pos, R&& rg );  // (desde C++23)
```

  
Insere caracteres do range rg antes do elemento (se houver) apontado por pos. 

Equivalente a 
```
    return insert(pos - begin(),
        std::basic_string(
            std::from_range,
            std​::​forward<R>(rg),
            get_allocator())
    );
```

Se pos não for um iterator válido em *this, o comportamento é indefinido. 

### Parâmetros

pos  |  \-  |  iterator antes do qual os caracteres serão inseridos   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>)  
  
### Valor de retorno

Um iterator que se refere ao primeiro caractere inserido, ou pos se nenhum caractere foi inserido porque rg estava vazio. 

### Complexidade

Linear no tamanho de rg. 

### Exceções

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::allocate lançar uma exceção, ela é relançada. 

Se a operação fizesse com que [`size()`](<#/doc/string/basic_string/size>) excedesse [`max_size()`](<#/doc/string/basic_string/max_size>), lança [std::length_error](<#/doc/error/length_error>). 

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | funções membro que aceitam [range compatível com container](<#/doc/ranges/to>)  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <iterator>
    #include <string>
     
    int main()
    {
        const auto source = {'l', 'i', 'b', '_'};
        std::string target{"__cpp_containers_ranges"};
        //                        ^a inserção ocorrerá
        //                         antes desta posição
     
        const auto pos = target.find("container");
        assert(pos != target.npos);
        auto iter = std::next(target.begin(), pos);
     
    #ifdef __cpp_lib_containers_ranges
        target.insert_range(iter, source);
    #else
        target.insert(iter, source.begin(), source.end());
    #endif
     
        assert(target == "__cpp_lib_containers_ranges");
        //                      ^^^^
    }
```

### Veja também

[ insert](<#/doc/string/basic_string/insert>) |  insere caracteres   
(função membro pública)  