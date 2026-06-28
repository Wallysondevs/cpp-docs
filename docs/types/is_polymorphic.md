# std::is_polymorphic

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_polymorphic;
```

`std::is_polymorphic` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é uma [classe polimórfica](<#/doc/language/objects>) (isto é, uma classe não-union que declara ou herda pelo menos uma função virtual), fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Se `T` é um tipo de classe não-union incompleto, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_polymorphic` ou `std::is_polymorphic_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_polymorphic_v = is_polymorphic<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de classe [polimórfica](<#/doc/language/objects>), false caso contrário
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

### Possível implementação
```cpp
    namespace detail
    {
        template<class T>
        std::true_type detect_is_polymorphic(
            decltype(dynamic_cast<const volatile void*>(static_cast<T*>(nullptr)))
        );
        template<class T>
        std::false_type detect_is_polymorphic(...);
    } // namespace detail
    
    template<class T>
    struct is_polymorphic : decltype(detail::detect_is_polymorphic<T>(nullptr)) {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct A { int m; };
    static_assert(!std::is_polymorphic_v<A>);
    
    struct B { virtual void foo(); };
    static_assert(std::is_polymorphic_v<B>);
    
    struct C : B {};
    static_assert(std::is_polymorphic_v<C>);
    
    struct D { virtual ~D() = default; };
    static_assert(std::is_polymorphic_v<D>);
    
    // Usa herança, mas não a palavra-chave virtual:
    struct E : A {};
    static_assert(!std::is_polymorphic_v<E>);
    
    struct F : virtual A {};
    static_assert(!std::is_polymorphic_v<F>);
    
    struct AX : A {};
    struct AY : A {};
    struct XY : virtual AX, virtual AY {};
    static_assert(!std::is_polymorphic_v<XY>);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | o comportamento era indefinido se
`T` é um tipo union incompleto | a característica base é
[std::false_type](<#/doc/types/integral_constant>) neste caso

### Veja também

[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(template de classe)
[ is_abstract](<#/doc/types/is_abstract>)(C++11) | verifica se um tipo é um tipo de classe abstrata
(template de classe)
[ has_virtual_destructor](<#/doc/types/has_virtual_destructor>)(C++11) | verifica se um tipo tem um destrutor virtual
(template de classe)