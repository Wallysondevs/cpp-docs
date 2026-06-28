# Palavra-chave C++: return

### Uso

  * Instrução [`return`](<#/doc/language/return>): como a declaração da instrução

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
     
    [[nodiscard]] constexpr auto clamp(int value, int min, int max) noexcept
    {
        if (value <= min)
            return min;
        else if (max <= value)
            return max;
     
        return value;
        // não será executado após a instrução 'return'
     
        std::exit(value);
    }
     
    int main() noexcept
    {
        std::cout << clamp(1, 2, 4);
        std::cout << clamp(3, 2, 4);
        std::cout << clamp(5, 2, 4);
     
        return 0; // o valor '0' que em main() indica sucesso
    }
```

Saída:
```
    234
```

### Veja também

  * Instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * Instrução [`constexpr` `if`](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)
  
  * Instrução [`consteval` `if`](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)
  
  * Instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de case) etc: [`default`](<#/doc/keyword/default>)
  * Instrução [`goto`](<#/doc/language/goto>): [`goto`](<#/doc/keyword/goto>)
  * Instrução [`continue`](<#/doc/language/continue>): [`continue`](<#/doc/keyword/continue>)
  * Instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)

  * Instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)
  
  * Laço [`do-while`](<#/doc/language/do>) e laço [`while`](<#/doc/language/while>): [`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)
  * Laço [`for`](<#/doc/language/for>) e [laço `for` baseado em range](<#/doc/language/range-for>): [`for`](<#/doc/keyword/for>)
