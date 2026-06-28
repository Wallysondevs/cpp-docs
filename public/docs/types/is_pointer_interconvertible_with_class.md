# std::is_pointer_interconvertible_with_class

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class S, class M >
constexpr bool is_pointer_interconvertible_with_class( M S::* mp ) noexcept;
```

Dado um objeto `s` do tipo `S`, determina se s.*mp se refere a um subobjeto de `s` e `s` é [interconvertível por ponteiro](<#/doc/language/static_cast>) com seu subobjeto s.*mp. O programa é malformado se `S` não for um [tipo completo](<#/doc/language/type-id>).

Se `S` não for um [StandardLayoutType](<#/doc/named_req/StandardLayoutType>), ou `M` não for um tipo de objeto, ou `mp` for igual a nullptr, o resultado é sempre false.

### Parâmetros

- **mp** — um ponteiro para membro a ser detectado

### Valor de retorno

true se s.*mp se referir a um subobjeto de `s` e `s` for interconvertível por ponteiro com seu subobjeto s.*mp, caso contrário false, onde `s` é um objeto do tipo `S`.

### Notas

O tipo de uma expressão ponteiro para membro &S::m nem sempre é M S::*, onde `m` é do tipo `M`, porque `m` pode ser um membro herdado de uma classe base de `S`. Os argumentos de template podem ser especificados para evitar resultados potencialmente surpreendentes.

Se houver um valor `mp` do tipo M S::* tal que std::is_pointer_interconvertible_with_class(mp) == true, então reinterpret_cast<M&>(s) tem um resultado bem definido e se refere ao mesmo subobjeto que s.*mp, onde `s` é um lvalue válido do tipo `S`.

Em plataformas comuns, o padrão de bits de `mp` é todo zero se std::is_pointer_interconvertible_with_class(mp) == true.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_is_pointer_interconvertible`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Traits de interconvertibilidade de ponteiro:

  * [std::is_pointer_interconvertible_base_of](<#/doc/types/is_pointer_interconvertible_base_of>),
  * `std::is_pointer_interconvertible_with_class`

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    struct Foo { int x; };
    struct Bar { int y; };
    
    struct Baz : Foo, Bar {}; // not standard-layout
    
    static_assert( not std::is_same_v<decltype(&Baz::x), int Baz::*> );
    static_assert( std::is_pointer_interconvertible_with_class(&Baz::x) );
    static_assert( not std::is_pointer_interconvertible_with_class<Baz, int>(&Baz::x) );
    
    int main() { }
```

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(modelo de classe)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para membro objeto não estático
(modelo de classe)