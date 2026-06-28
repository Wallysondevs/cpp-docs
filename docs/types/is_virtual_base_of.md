# std::is_virtual_base_of

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class Base, class Derived >
struct is_virtual_base_of;
```

`std::is_virtual_base_of` é um `[BinaryTypeTrait](<#/doc/named_req/BinaryTypeTrait>)`.

Se `Base` é uma [classe base virtual](<#/doc/language/derived_class>) de `Derived` (ignorando qualificadores cv), fornece a constante membro `value` igual a `true`. Caso contrário, `value` é `false`.

Se ambos `Base` e `Derived` são tipos de classe não-union (ignorando qualificadores cv), `Derived` deve ser um [tipo completo](<#/doc/language/incomplete_type>); caso contrário, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_virtual_base_of` ou `std::is_virtual_base_of_v`, o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class Base, class Derived >
constexpr bool is_virtual_base_of_v = is_virtual_base_of<Base, Derived>::value;  // (desde C++26)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `Derived` é derivado da classe base virtual `Base` (ignorando qualificadores cv), false caso contrário
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

`std::is_virtual_base_of_v<A, B>` é `true` mesmo se `A` é uma classe base privada, protegida ou ambígua de `B`.

Se `std::is_virtual_base_of_v<A, B>` é `true`, então `[std::is_base_of_v](<#/doc/types/is_base_of>)<A, B>` também é `true`. No entanto, o inverso nem sempre é verdadeiro porque a verificação de herança virtual é mais específica. Nesse caso, `std::is_virtual_base_of_v<T, T>` é `false` mesmo se `T` é um tipo de classe não-union.

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    class A {};
    class B : A {};
    class C : B {};
    class D : virtual A {};
    class E : D {};
    
    union F {};
    using I = int;
    
    static_assert
    (
        std::is_virtual_base_of_v<A, A> != true &&
        std::is_virtual_base_of_v<A, B> != true &&
        std::is_virtual_base_of_v<A, D> == true &&
        std::is_virtual_base_of_v<D, E> != true &&
        std::is_virtual_base_of_v<F, F> != true &&
        std::is_virtual_base_of_v<I, I> != true
    );
    
    int main() {}
```

### Ver também

[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é base do outro tipo
(template de classe)
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(template de classe)
[ derived_from](<#/doc/concepts/derived_from>)(C++20) | especifica que um tipo é derivado de outro tipo
(conceito)