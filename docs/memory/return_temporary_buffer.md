# std::return_temporary_buffer

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
void return_temporary_buffer( T* p );
(removido em C++20)
```

Desaloca o armazenamento referenciado por p.

Se p não for um valor de ponteiro retornado por uma chamada anterior a [std::get_temporary_buffer](<#/doc/memory/get_temporary_buffer>), ou tiver sido invalidado por uma chamada `std::return_temporary_buffer` intermediária, o comportamento é indefinido.

### Parâmetros

- **p** — o ponteiro que referencia o armazenamento a ser desalocado

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Exemplo

Executar este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <memory>
    #include <string>
    
    int main()
    {
        const std::string s[] = {"string", "1", "test", "..."};
        const auto p = std::get_temporary_buffer<std::string>(4);
        // requires that p.first is passed to return_temporary_buffer
        // (beware of early exit points and exceptions), or better use:
        std::unique_ptr<std::string, void(*)(std::string*)> on_exit(p.first,
        * p)
        {
            std::cout << "returning temporary buffer...\n";
            std::return_temporary_buffer(p);
        });
    
        std::copy(s, s + p.second,
                  std::raw_storage_iterator<std::string*, std::string>(p.first));
        // has same effect as: std::uninitialized_copy(s, s + p.second, p.first);
        // requires that each string in p is individually destroyed
        // (beware of early exit points and exceptions)
    
        std::copy(p.first, p.first + p.second,
                  std::ostream_iterator<std::string>{std::cout, "\n"});
    
        std::for_each(p.first, p.first + p.second, & e)
        {
            e.~basic_string<char>();
        }); // same as: std::destroy(p.first, p.first + p.second);
    
        // manually reclaim memory if unique_ptr-like technique is not used:
        // std::return_temporary_buffer(p.first);
    }
```

Saída:
```
    string
    1
    test
    ...
    returning temporary buffer...
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2072](<https://cplusplus.github.io/LWG/issue2072>) | C++98 | o armazenamento alocado por [std::get_temporary_buffer](<#/doc/memory/get_temporary_buffer>) poderia ser desalocado múltiplas vezes | o comportamento é indefinido neste caso

### Ver também

[ get_temporary_buffer](<#/doc/memory/get_temporary_buffer>)(obsoleto desde C++17)(removido em C++20) | obtém armazenamento não inicializado
(modelo de função)