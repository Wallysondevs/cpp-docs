# Palavra-chave C++: for

### Uso

  * loop [`for`](<#/doc/language/for>): como a declaração do loop 

  * loop [`for`](<#/doc/language/range-for>) baseado em range: como a declaração do loop 

| (desde C++11)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    int main() noexcept
    {
        // A seguinte instrução de loop 'for':
        // 1. (init-statement) Declara um inteiro chamado 'i' e o inicializa com o valor '0'.
        // 2. (condition)      Verifica se i é menor que 3 e, caso contrário, encerra a execução do loop.
        // 3. (statement)      Escreve o valor atual do inteiro 'i' para a saída padrão (stdout).
        // 4. (expression)     Pré-incrementa o inteiro 'i' (aumenta seu valor em 1).
        // 5.                  Retorna ao ponto 2 (condition).
    
                                    // init-statement: int i{0};
                                    // condition:      i < 3
        for (int i{0}; i < 3; ++i)  // expression:     ++i
            std::cout << i;         // statement:      std::cout << i;
    }
```

Saída: 
```
    012
```

### Veja também

  * instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * instrução [`constexpr` `if`](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)  
  
  * instrução [`consteval` `if`](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)  
  
  * instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de case) etc: [`default`](<#/doc/keyword/default>)
  * instrução [`goto`](<#/doc/language/goto>): [`goto`](<#/doc/keyword/goto>)
  * instrução [`continue`](<#/doc/language/continue>): [`continue`](<#/doc/keyword/continue>)
  * instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)
  * instrução [`return`](<#/doc/language/return>): [`return`](<#/doc/keyword/return>)

  * instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)  
  
  * loop [`do-while`](<#/doc/language/do>) e loop [`while`](<#/doc/language/while>): [`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)
