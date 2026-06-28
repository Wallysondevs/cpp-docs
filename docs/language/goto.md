# Instrução goto

Transfere o controle incondicionalmente.

Usada quando é impossível, de outra forma, transferir o controle para o local desejado usando outras instruções.

### Sintaxe

---
attr ﻿(opcional) `goto` label `;`

### Explicação

A instrução goto transfere o controle para o local especificado por [label](<#/doc/language/statements>). A instrução goto deve estar na mesma função que o label ao qual se refere, podendo aparecer antes ou depois do label.

Se a transferência de controle sair do escopo de quaisquer variáveis automáticas (por exemplo, saltando para trás para um ponto antes das declarações de tais variáveis ou saltando para frente para fora de uma instrução composta onde as variáveis estão no escopo), os destrutores são chamados para todas as variáveis cujo escopo foi encerrado, na ordem oposta à ordem de sua construção.

A instrução goto não pode transferir o controle para uma [instrução com fluxo de controle limitado](<#/doc/language/statements>), mas pode transferir o controle para fora de uma instrução com fluxo de controle limitado (as regras acima relativas a variáveis automáticas no escopo são seguidas).

Se a transferência de controle entrar no escopo de quaisquer variáveis automáticas (por exemplo, saltando para frente sobre uma instrução de declaração), o programa é malformado (não pode ser compilado), a menos que todas as variáveis cujo escopo é inserido tenham os seguintes tipos:

  * tipos escalares declarados sem inicializadores
  * tipos de classe com construtores padrão triviais e destrutores triviais declarados sem inicializadores
  * versões cv-qualified de um dos itens acima
  * arrays de um dos itens acima

(Nota: as mesmas regras se aplicam a todas as formas de transferência de controle)

### Notas

Na linguagem de programação C, a instrução goto tem menos restrições e pode entrar no escopo de qualquer variável, exceto [array de tamanho variável](<#/>) ou ponteiro modificado variavelmente.

### Palavras-chave

[`goto`](<#/doc/keyword/goto>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    struct Object
    {
        // non-trivial destructor
        ~Object() { std::cout << 'd'; }
    };
     
    struct Trivial
    {
        double d1;
        double d2;
    }; // trivial ctor and dtor
     
    int main()
    {
        int a = 10;
     
        // loop using goto
    label:
        Object obj;
        std::cout << a << ' ';
        a -= 2;
     
        if (a != 0)
            goto label;  // jumps out of scope of obj, calls obj destructor
        std::cout << '\n';
     
        // goto can be used to efficiently leave a multi-level (nested) loops
        for (int x = 0; x < 3; ++x)
            for (int y = 0; y < 3; ++y)
            {
                std::cout << '(' << x << ',' << y << ") " << '\n';
                if (x + y >= 3)
                    goto endloop;
            }
     
    endloop:
        std::cout << '\n';
     
        goto label2; // jumps into the scope of n and t
     
        [[maybe_unused]] int n; // no initializer
     
        [[maybe_unused]] Trivial t; // trivial ctor/dtor, no initializer
     
    //  int x = 1;   // error: has initializer
    //  Object obj2; // error: non-trivial dtor
     
    label2:
        {
            Object obj3;
            goto label3; // jumps forward, out of scope of obj3
        }
     
    label3:
        std::cout << '\n';
    }
```

Saída:
```
    10 d8 d6 d4 d2
    (0,0)
    (0,1)
    (0,2)
    (1,0)
    (1,1)
    (1,2)
     
    d
    d
```

### Veja também

[Documentação C](<#/>) para goto
---

### Links externos

O popular ensaio de Edsger W. Dijkstra, [“Goto Considered Harmful”](<http://david.tribble.com/text/goto.html>) (originalmente, em "Letter to Communications of the ACM (CACM)", vol. 11 #3, Março de 1968, pp. 147-148.), apresenta uma pesquisa sobre os muitos problemas sutis que o uso descuidado desta palavra-chave pode introduzir.
---