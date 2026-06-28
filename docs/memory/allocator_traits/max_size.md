# std::allocator_traits&lt;Alloc&gt;::max_size

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
static size_type max_size( const Alloc& a ) noexcept;
(constexpr desde C++20)
```

  
Se possível, obtém o tamanho máximo de alocação teoricamente possível do allocator `a`, chamando `a.max_size()`.

Se o acima não for possível (por exemplo, se `Alloc` não possui a função membro `max_size()`), então retorna [std::numeric_limits](<#/doc/types/numeric_limits>)<size_type>::max() / sizeof(value_type).

### Parâmetros

a  |  \-  |  allocator a ser detectado   
  
### Valor de retorno

Tamanho máximo de alocação teórico.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2162](<https://cplusplus.github.io/LWG/issue2162>) | C++11  | `max_size` não era exigido ser `noexcept`  | exigido   
[LWG 2466](<https://cplusplus.github.io/LWG/issue2466>) | C++11  | tamanho máximo de alocação teórico em bytes era retornado como fallback  | tamanho em elementos é retornado   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <locale>
     
    int main()
    {
        std::allocator<short> b;
        std::allocator<int> d;
     
        const auto p = std::allocator_traits<decltype(b)>::max_size(b);
        const auto q = std::allocator_traits<decltype(d)>::max_size(d);
     
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << std::uppercase
                  << "p = " << std::dec << p << " = 0x" << std::hex << p << '\n'
                  << "q = " << std::dec << q << " = 0x" << std::hex << q << '\n';
    }
```

Saída possível:
```
    p = 9,223,372,036,854,775,807 = 0x7,FFF,FFF,FFF,FFF,FFF
    q = 4,611,686,018,427,387,903 = 0x3,FFF,FFF,FFF,FFF,FFF
```

### Veja também

[ max_size](<#/doc/memory/allocator/max_size>)(até C++20) |  retorna o maior tamanho de alocação suportado   
(função membro pública de `std::allocator<T>`)  