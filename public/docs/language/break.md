# instrução break

Faz com que o loop [for](<#/doc/language/for>), [range-for](<#/doc/language/range-for>), [while](<#/doc/language/while>) ou [do-while](<#/doc/language/do>) ou a [instrução switch](<#/doc/language/switch>) que o envolve termine.
Usado quando seria de outra forma complicado terminar o loop usando a expressão de condição e instruções condicionais.

### Sintaxe

---
attr ﻿(opcional) `break` `;`
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)

### Explicação

Aparece apenas dentro da instrução de um corpo de loop ([`while`](<#/doc/language/while>), [`do-while`](<#/doc/language/do>), [`for`](<#/doc/language/for>)) ou dentro da instrução de um [`switch`](<#/doc/language/switch>). Após esta instrução, o controle é transferido para a instrução imediatamente seguinte ao loop ou switch que o envolve. Assim como em qualquer saída de bloco, todos os objetos de armazenamento automático declarados na instrução composta que o envolve ou na condição de um loop/switch são destruídos, na ordem inversa de construção, antes da execução da primeira linha após o loop que o envolve.

### Notas

Uma instrução break não pode ser usada para sair de múltiplos loops aninhados. A [instrução goto](<#/doc/language/goto>) pode ser usada para este propósito.

### Palavras-chave

[`break`](<#/doc/keyword/break>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        int i = 2;
        switch (i)
        {
            case 1: std::cout << "1";   // <---- talvez aviso: fall through
            case 2: std::cout << "2";   // a execução começa neste rótulo de case (+aviso)
            case 3: std::cout << "3";   // <---- talvez aviso: fall through
            case 4:                     // <---- talvez aviso: fall through
            case 5: std::cout << "45";  //
                    break;              // a execução das instruções subsequentes é terminada
            case 6: std::cout << "6";
        }
        std::cout << '\n';
    
        for (char c = 'a'; c < 'c'; c++)
        {
            for (int i = 0; i < 5; i++)      // apenas este loop é afetado pelo break
            {                                //
                if (i == 2)                  //
                    break;                   //
                std::cout << c << i << ' ';  //
            }
        }
        std::cout << '\n';
    }
```

Saída possível:
```
    2345
    a0 a1 b0 b1
```

### Veja também

`[[[fallthrough](<#/doc/language/attributes/fallthrough>)]]`(C++17) | indica que a passagem direta (fall through) do rótulo de case anterior é intencional e não deve ser diagnosticada por um compilador que avisa sobre fall-through
(especificador de atributo)
[documentação C](<#/>) para break