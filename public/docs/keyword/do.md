# Palavra-chave C++: do

### Uso
  * [`do-while` loop](<#/doc/language/do>): como a declaração do loop

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    int main() noexcept
    {
        int i{0};
     
        // executa a instrução 'std::cout << ++i;'
        // antes de verificar a condição 'i <= 2'
        do
            std::cout << ++i;
        while (i <= 2);
    }
```

Saída:
```
    123
```

### Veja também

  * Instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * Instrução [`constexpr` `if`](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)

  * Instrução [`consteval` `if`](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)

  * Instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de caso) etc: [`default`](<#/doc/keyword/default>)
  * Instrução [`goto`](<#/doc/language/goto>): [`goto`](<#/doc/keyword/goto>)
  * Instrução [`continue`](<#/doc/language/continue>): [`continue`](<#/doc/keyword/continue>)
  * Instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)
  * Instrução [`return`](<#/doc/language/return>): [`return`](<#/doc/keyword/return>)

  * Instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)

  * Loop [`do-while`](<#/doc/language/do>) e loop [`while`](<#/doc/language/while>): [`while`](<#/doc/keyword/while>)
  * Loop [`for`](<#/doc/language/for>) e [loop `for` baseado em range](<#/doc/language/range-for>): [`for`](<#/doc/keyword/for>)
