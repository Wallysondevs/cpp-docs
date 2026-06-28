# std::is_base_of

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class Base, class Derived >
struct is_base_of;
```

`std::is_base_of` é um [BinaryTypeTrait](<#/doc/named_req/BinaryTypeTrait>).

Se `Derived` é [derivada](<#/doc/language/derived_class>) de `Base` ou se ambas são a mesma classe não-união (em ambos os casos ignorando a qualificação cv), fornece o membro constante `value` igual a `true`. Caso contrário, `value` é `false`.

Se `Base` e `Derived` são ambos tipos de classe não-união, e não são do mesmo tipo (ignorando a qualificação cv), `Derived` deve ser um [tipo completo](<#/doc/language/incomplete_type>); caso contrário, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_base_of` ou `std::is_base_of_v`(desde C++17), o comportamento é indefinido.

### Modelo de variável auxiliar

```cpp
template< class Base, class Derived >
constexpr bool is_base_of_v = is_base_of<Base, Derived>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Membros constantes

value[static] | true se `Derived` é derivada de `Base` ou se ambas são a mesma classe não-união (em ambos os casos ignorando a qualificação cv), `false` caso contrário
(membro constante estático público)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

`std::is_base_of<A, B>::value` é `true` mesmo se `A` é uma classe base privada, protegida ou ambígua de `B`. Em muitas situações, [std::is_convertible](<#/doc/types/is_convertible>)<B*, A*> é o teste mais apropriado.

Embora nenhuma classe seja sua própria base, `std::is_base_of<T, T>::value` é `true` porque a intenção do trait é modelar a relação "é-um", e `T` é um `T`. Apesar disso, `std::is_base_of<int, int>::value` é `false` porque apenas classes participam da relação que este trait modela.

### Implementação Possível
```cpp
    namespace details
    {
        template<typename B>
        std::true_type test_ptr_conv(const volatile B*);
        template<typename>
        std::false_type test_ptr_conv(const volatile void*);
    
        template<typename B, typename D>
        auto test_is_base_of(int) -> decltype(test_ptr_conv<B>(static_cast<D*>(nullptr)));
        template<typename, typename>
        auto test_is_base_of(...) -> std::true_type; // private or ambiguous base
    }
    
    template<typename Base, typename Derived>
    struct is_base_of :
        std::integral_constant<
            bool,
            std::is_class<Base>::value &&
            std::is_class<Derived>::value &&
            decltype(details::test_is_base_of<Base, Derived>(0))::value
        > {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    class B : A {};
    class C : B {};
    class D {};
    union E {};
    using I = int;
    
    static_assert
    (
        std::is_base_of_v<A, A> == true &&
        std::is_base_of_v<A, B> == true &&
        std::is_base_of_v<A, C> == true &&
        std::is_base_of_v<A, D> != true &&
        std::is_base_of_v<B, A> != true &&
        std::is_base_of_v<E, E> != true &&
        std::is_base_of_v<I, I> != true
    );
    
    int main() {}
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2015](<https://cplusplus.github.io/LWG/issue2015>) | C++11 | o comportamento pode ser indefinido se `Derived` for um tipo de união incompleto | a característica base é [std::false_type](<#/doc/types/integral_constant>) neste caso

### Veja também

[ is_virtual_base_of](<#/doc/types/is_virtual_base_of>)(C++26) | verifica se um tipo é uma base virtual do outro tipo
(modelo de classe)
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(modelo de classe)
[ derived_from](<#/doc/concepts/derived_from>)(C++20) | especifica que um tipo é derivado de outro tipo
(conceito)