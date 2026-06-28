# Requisitos nomeados C++: MoveConstructible (desde C++11)

Especifica que uma instância do tipo pode ser construída a partir de um argumento [rvalue](<#/doc/language/value_category>).

### Requisitos

O tipo `T` satisfaz MoveConstructible se

Dado

  * `rv`, uma expressão [rvalue](<#/doc/language/value_category>) do tipo `T`,
  * `u`, um identificador arbitrário.

As seguintes expressões devem ser válidas e ter seus efeitos especificados.

Expressão | Pós-condições
---|---
T u = rv; | O valor de `u` é equivalente ao valor de `rv` antes da inicialização. O novo valor de `rv` é não especificado.
T(rv) | O valor de `T(rv)` é equivalente ao valor de `rv` antes da inicialização. O novo valor de `rv` é não especificado.

### Observações

Uma classe não precisa implementar um [construtor de movimento](<#/doc/language/move_constructor>) para satisfazer este requisito de tipo: um [construtor de cópia](<#/doc/language/copy_constructor>) que recebe um argumento `const T&` pode vincular expressões rvalue.

Se uma classe MoveConstructible implementar um construtor de movimento, ela também pode implementar [semântica de movimento](<#/doc/utility/move>) para aproveitar o fato de que o valor de `rv` após a construção é não especificado.

Conteúdo estendido
---
Ser uma classe MoveConstructible implica [std::is_move_constructible](<#/doc/types/is_move_constructible>), mas não o contrário, já que [std::is_move_constructible](<#/doc/types/is_move_constructible>) verificará apenas a capacidade de chamar o construtor com os argumentos corretos, e não um valor de pós-condição. Execute este código
```cpp
    #include <iostream>
     
    struct S
    {
        int n;
        S(int in) : n{in} {}
        S(S&& other) { n = other.n + 1; }
    };
    static_assert(std::is_move_constructible_v<S>);
     
    int main()
    {
        S v{1};
        std::cout << "v.n = " << v.n << '\n';
        S u = std::move(v);
     
        // Class `S` doesn't satisfy a MoveConstructible requirement
        // The value of `u` is NOT equivalent to the value of `v` before the `u` initialization
        std::cout << "u.n = " << u.n << '\n';
    }
```

Saída:
```
    v.n = 1
    u.n = 2
```

### Referências

Conteúdo estendido
---

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 16.4.4.2 Requisitos de argumento de template [utility.arg.requirements]

### Veja também

[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(template de classe)
[ move_constructible](<#/doc/concepts/move_constructible>)(C++20) | especifica que um objeto de um tipo pode ser construído por movimento
(conceito)
  *[_(as is)_]: A::pointer