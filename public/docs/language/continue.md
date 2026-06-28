# instrução continue

Faz com que a porção restante do corpo do laço [for](<#/doc/language/for>), [range-for](<#/doc/language/range-for>), [while](<#/doc/language/while>) ou [do-while](<#/doc/language/do>) envolvente seja ignorada.

Usado quando seria de outra forma complicado ignorar a porção restante do laço usando instruções condicionais.

### Sintaxe

---
attr ﻿(opcional) `continue` `;`

### Explicação

A instrução `continue` causa um salto, como se por [goto](<#/doc/language/goto>), para o final do corpo do laço (ela só pode aparecer dentro do corpo dos laços [for](<#/doc/language/for>), [range-for](<#/doc/language/range-for>), [while](<#/doc/language/while>) e [do-while](<#/doc/language/do>)).

Mais precisamente,

Para o laço [while](<#/doc/language/while>), ele age como
```
    while (/* ... */)
    {
       // ...
       continue; // age como goto contin;
       // ...
       contin:;
    }
```

Para o laço [do-while](<#/doc/language/do>), ele age como:
```
    do
    {
        // ...
        continue; // age como goto contin;
        // ...
        contin:;
    } while (/* ... */);
```

Para os laços [for](<#/doc/language/for>) e [range-for](<#/doc/language/range-for>), ele age como:
```
    for (/* ... */)
    {
        // ...
        continue; // age como goto contin;
        // ...
        contin:;
    }
```

### Palavras-chave

[`continue`](<#/doc/keyword/continue>)

### Exemplo

Execute este código
```
    #include <iostream>
     
    int main()
    {
        for (int i = 0; i < 10; ++i)
        {
            if (i != 5)
                continue;
            std::cout << i << ' ';      // esta instrução é ignorada toda vez que i != 5
        }
        std::cout << '\n';
     
        for (int j = 0; 2 != j; ++j)
            for (int k = 0; k < 5; ++k) // apenas este laço é afetado por continue
            {
                if (k == 3)
                    continue;
                // esta instrução é ignorada toda vez que k == 3:
                std::cout << '(' << j << ',' << k << ") ";
            }
        std::cout << '\n';
    }
```

Saída:
```
    5
    (0,0) (0,1) (0,2) (0,4) (1,0) (1,1) (1,2) (1,4)
```

### Veja também

[documentação C](<#/>) para continue
---