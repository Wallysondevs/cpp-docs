# loop do-while

Executa uma instrução repetidamente (pelo menos uma vez) de forma condicional.

### Sintaxe

---
attr ﻿(optional) `do` statement `while (` expression `);`
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **expression** — uma [expressão](<#/doc/language/expressions>)
- **statement** — uma [instrução](<#/doc/language/statements>) (tipicamente uma instrução composta)

### Explicação

Quando o controle atinge uma instrução do, sua instrução será executada incondicionalmente.

Toda vez que a instrução terminar sua execução, a expression será avaliada e convertida contextualmente para bool. Se o resultado for true, a instrução será executada novamente.

Se o loop precisar ser terminado dentro da instrução, uma [instrução break](<#/doc/language/break>) pode ser usada como instrução de término.

Se a iteração atual precisar ser terminada dentro da instrução, uma [instrução continue](<#/doc/language/continue>) pode ser usada como atalho.

### Notas

Como parte da [garantia de progresso](<#/doc/language/multithread>) do C++, o comportamento é [indefinido](<#/doc/language/ub>) se um loop que não é um [loop infinito trivial](<#/doc/language/multithread>) (desde C++26) sem [comportamento observável](<#/doc/language/as_if>) não terminar. Compiladores são permitidos a remover tais loops.

### Palavras-chave

[`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    int main()
    {
        int j = 2;
        do // compound statement is the loop body
        {
            j += 2;
            std::cout << j << ' ';
        }
        while (j < 9);
        std::cout << '\n';
    
        // common situation where do-while loop is used
        std::string s = "aba";
        std::sort(s.begin(), s.end());
    
        do std::cout << s << '\n'; // expression statement is the loop body
        while (std::next_permutation(s.begin(), s.end()));
    }
```

Saída:
```
    4 6 8 10
    aab
    aba
    baa
```

### Veja também

[Documentação C](<#/>) para do-while
---