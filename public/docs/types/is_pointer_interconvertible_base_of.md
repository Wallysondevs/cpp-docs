# std::is_pointer_interconvertible_base_of

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class Base, class Derived >
struct is_pointer_interconvertible_base_of;
```

Se `Derived` é derivado de `Base` de forma não ambígua e cada objeto `Derived` é [interconvertível por ponteiro](<#/doc/language/static_cast>) com seu subobjeto `Base`, ou se ambos são a mesma classe não-union (em ambos os casos ignorando a qualificação cv), fornece a constante membro `value` igual a true. Caso contrário, `value` é false.

Se ambos `Base` e `Derived` são tipos de classe não-union, e eles não são do mesmo tipo (ignorando a qualificação cv), `Derived` deve ser um [tipo completo](<#/doc/language/incomplete_type>); caso contrário, o comportamento é indefinido.

Se o programa adicionar especializações para `std::is_pointer_interconvertible_base_of` ou `std::is_pointer_interconvertible_base_of_v`, o comportamento é indefinido.

### Template de variável auxiliar

```cpp
template< class Base, class Derived >
inline constexpr bool is_pointer_interconvertible_base_of_v =
is_pointer_interconvertible_base_of<Base, Derived>::value;  // (desde C++20)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `Derived` é derivado de `Base` de forma não ambígua e cada objeto `Derived` é [interconvertível por ponteiro](<#/doc/language/static_cast>) com seu subobjeto `Base`, ou se ambos são a mesma classe não-union (em ambos os casos ignorando a qualificação cv), false caso contrário
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

std::is_pointer_interconvertible_base_of_v<T, U> pode ser true mesmo que `T` seja uma classe base privada ou protegida de `U`.

Seja

*   `U` um tipo de objeto completo,
*   `T` um tipo de objeto completo com qualificação cv não menor que `U`,
*   `u` qualquer lvalue válido de `U`,

reinterpret_cast<T&>(u) sempre tem um resultado bem definido se std::is_pointer_interconvertible_base_of_v<T, U> for true.

Se `T` e `U` não são do mesmo tipo (ignorando a qualificação cv) e `T` é uma classe base interconvertível por ponteiro de `U`, então ambos [std::is_standard_layout_v](<#/doc/types/is_standard_layout>)&lt;T&gt; e [std::is_standard_layout_v](<#/doc/types/is_standard_layout>)&lt;U&gt; são true.

Se `T` é um tipo de classe standard layout, então todas as classes base de `T` (se houver) são classes base interconvertíveis por ponteiro de `T`.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_is_pointer_interconvertible`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Traits de interconvertibilidade por ponteiro:

*   `std::is_pointer_interconvertible_base_of`,
*   [std::is_pointer_interconvertible_with_class](<#/doc/types/is_pointer_interconvertible_with_class>)

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct Foo {};
    
    struct Bar {};
    
    class Baz : Foo, public Bar { int x; };
    
    class NonStdLayout : public Baz { int y; };
    
    static_assert(std::is_pointer_interconvertible_base_of_v<Bar, Baz>);
    static_assert(std::is_pointer_interconvertible_base_of_v<Foo, Baz>);
    static_assert(not std::is_pointer_interconvertible_base_of_v<Baz, NonStdLayout>);
    static_assert(std::is_pointer_interconvertible_base_of_v<NonStdLayout, NonStdLayout>);
    
    int main() {}
```

### Veja também

[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é uma base do outro tipo
(template de classe)
[ is_empty](<#/doc/types/is_empty>)(C++11) | verifica se um tipo é um tipo de classe (mas não union) e não possui membros de dados não estáticos
(template de classe)
[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(template de classe)