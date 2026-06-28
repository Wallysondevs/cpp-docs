# std::is_empty

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_empty;
```

`std::is_empty` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo vazio (isto é, um tipo de classe não-union sem membros de dados não-estáticos além de bit-fields de tamanho 0, sem funções virtuais, sem classes base virtuais e sem classes base não-vazias), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se `T` é um tipo de classe não-union incompleto, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_empty` ou `std::is_empty_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_empty_v = is_empty<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de classe vazio, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Herdar de classes base vazias geralmente não aumenta o tamanho de uma classe devido à [otimização de classe base vazia](<#/doc/language/ebo>).

`std::is_empty<T>` e todos os outros type traits são classes vazias.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    struct A {};
    static_assert(std::is_empty_v<A> == true);
    
    struct B { int m; };
    static_assert(std::is_empty_v<B> == false);
    
    struct C { static int m; };
    static_assert(std::is_empty_v<C> == true);
    
    struct D { virtual ~D(); };
    static_assert(std::is_empty_v<D> == false);
    
    union E {};
    static_assert(std::is_empty_v<E> == false);
    
    struct F { [[no_unique_address]] E e; };
    
    struct G
    {
        int:0;
        // C++ standard allow "as a special case, an unnamed bit-field with a width of zero
        // specifies alignment of the next bit-field at an allocation unit boundary.
        // Only when declaring an unnamed bit-field may the width be zero."
    };
    static_assert(std::is_empty_v<G>); // holds only unnamed bit-fields of zero width
    
    int main()
    {
        std::cout << std::boolalpha;
        std::cout << "F: " << std::is_empty_v<F> << '\n'; // the result is ABI-dependent
    }
```

Saída possível:
```
    F: true
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | o comportamento era indefinido se `T` fosse um tipo union incompleto | a característica base é [std::false_type](<#/doc/types/integral_constant>) neste caso

### Veja também

[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(modelo de classe)