# instrução return

Finaliza a função atual e retorna o valor especificado (se houver) para o chamador.

### Sintaxe

---
attr (opcional) `return` expression (opcional) `;` | (1) |
---|---|---
attr (opcional) `return` braced-init-list `;` | (2) | (desde C++11)
attr (opcional) `co_return` expression (opcional) `;` | (3) | (desde C++20)
attr (opcional) `co_return` braced-init-list `;` | (4) | (desde C++20)
attr | \- | (desde C++11) sequência de qualquer número de [atributos](<#/doc/language/attributes>)
expression | \- | [expression](<#/doc/language/expressions>), conversível para o tipo de retorno da função
braced-init-list | \- | [lista de inicializadores entre chaves](<#/doc/language/initialization>)

### Explicação

1) Avalia a expression, finaliza a função atual e retorna o resultado da expression para o chamador, após [conversão implícita](<#/doc/language/implicit_cast>) para o tipo de retorno da função. A expression é opcional em funções cujo tipo de retorno é void (possivelmente cv-qualificado), e não permitida em construtores e destrutores.

2) Usa [copy-list-initialization](<#/doc/language/list_initialization>) para construir o valor de retorno da função.

3,4) Em uma coroutine, a palavra-chave co_return deve ser usada em vez de return para o ponto de suspensão final (veja [coroutines](<#/doc/language/coroutines>) para detalhes).

Existe um [sequence point](<#/doc/language/eval_order>) entre a copy-initialization do resultado da chamada de função e a destruição de todos os temporários no final da expression. | (até C++11)
---|---
A copy-initialization do resultado da chamada de função é [sequenced-before](<#/doc/language/eval_order>) a destruição de todos os temporários no final da expression, que, por sua vez, é _sequenced-before_ a destruição de variáveis locais do bloco que envolve a instrução return. | (desde C++11)
Se o tipo de retorno da função for um tipo de referência e uma instrução return (1,2) vincular a referência retornada ao resultado de uma [temporary expression](<#/doc/language/reference_initialization>), o programa é malformado. | (desde C++26)

Se o controle atinge o final de

*   uma função com o tipo de retorno void (possivelmente cv-qualificado),
*   um construtor,
*   um destrutor, ou
*   um [function try block](<#/doc/language/try>) para uma função com o tipo de retorno void (possivelmente cv-qualificado)

sem encontrar uma instrução return, return; é executado.

Se o controle atinge o final da [`main` function](<#/doc/language/main_function>), return 0; é executado.

Sair do final de uma função que retorna valor, exceto a função `main` e [coroutines](<#/doc/language/coroutines>) específicas (desde C++20), sem uma instrução return é comportamento indefinido.

Em uma função que retorna void (possivelmente cv-qualificado), a instrução return com expression pode ser usada, se o tipo da expression for void (possivelmente cv-qualificado).

Se o tipo de retorno de uma função for especificado como um [placeholder type](<#/doc/language/auto>), ele será [deduzido](<#/doc/language/function>) do valor de retorno. | (desde C++14)

### Notas

Retornar por valor pode envolver a construção e cópia/movimentação de um objeto temporário, a menos que [copy elision](<#/doc/language/copy_elision>) seja usada. Especificamente, as condições para cópia/movimentação são as seguintes:

#### Move automático de variáveis locais e parâmetros

A expression é _elegível para move_ se for uma [identifier expression](<#/doc/language/name>) (possivelmente entre parênteses) que nomeia uma variável com duração de armazenamento automática cujo tipo é

*   um tipo de objeto não volátil

|

*   ou uma rvalue reference não volátil para um tipo de objeto

| (desde C++20)

e essa variável é declarada

*   no corpo ou
*   como um parâmetro

da função ou lambda expression mais interna que a envolve.
Se a expression for elegível para move, a [overload resolution](<#/doc/language/overload_resolution>) para selecionar o construtor a ser usado para a inicialização do valor retornado ou, para co_return, para selecionar a sobrecarga de promise.return_value()(desde C++20) é realizada _duas vezes_ :

*   primeiro como se a expression fosse uma rvalue expression (assim, pode selecionar o [move constructor](<#/doc/language/move_constructor>)), e

*   se a primeira overload resolution falhou ou

|

*   ela foi bem-sucedida, mas não selecionou o [move constructor](<#/doc/language/move_constructor>) (formalmente, o primeiro parâmetro do construtor selecionado não era uma rvalue reference para o tipo (possivelmente cv-qualificado) da expression)

| (até C++20)

*   então a overload resolution é realizada como de costume, com a expression considerada como um lvalue (assim, pode selecionar o [copy constructor](<#/doc/language/copy_constructor>)).

(até C++23)
Se a expression for elegível para move, ela é tratada como um xvalue (assim, a overload resolution pode selecionar o [move constructor](<#/doc/language/move_constructor>)). | (desde C++23)
(desde C++11)

#### Copy elision garantida

Se a expression for um prvalue, o objeto resultante é inicializado diretamente por essa expression. Isso não envolve um copy ou move constructor quando os tipos correspondem (veja [copy elision](<#/doc/language/copy_elision>)). | (desde C++17)
---|---|---|---
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_implicit_move`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Move [implícito](<#/doc/language/return>) mais simples

### Palavras-chave

[`return`](<#/doc/keyword/return>), [`co_return`](<#/doc/keyword/co_return>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <utility>
    
    void fa(int i)
    {
        if (i == 2)
            return;
        std::cout << "fa("<< i << ")\n";
    } // return; implícito
    
    int fb(int i)
    {
        if (i > 4)
            return 4;
        std::cout << "fb(" << i << ")\n";
        return 2;
    }
    
    std::pair<std::string, int> fc(const char* p, int x)
    {
        return {p, x};
    }
    
    void fd()
    {
        return fa(10); // fa(10) é uma void expression
    }
    
    int main()
    {
        fa(1); // imprime seu argumento, então retorna
        fa(2); // não faz nada quando i == 2, apenas retorna
    
        int i = fb(5); // retorna 4
        i = fb(i);     // imprime seu argumento, retorna 2
        std::cout << "i = " << i << '\n'
                  << "fc(~).second = " << fc("Hello", 7).second << '\n';
    
        fd();
    }
    
    struct MoveOnly
    {
        MoveOnly() = default;
        MoveOnly(MoveOnly&&) = default;
    };
    
    MoveOnly move_11(MoveOnly arg)
    {
        return arg; // OK. move implícito
    }
    
    MoveOnly move_11(MoveOnly&& arg)
    {
        return arg; // OK desde C++20. move implícito
    }
    
    MoveOnly&& move_23(MoveOnly&& arg)
    {
        return arg; // OK desde C++23. move implícito
    }
```

Saída:
```
    fa(1)
    fb(4)
    i = 2
    fc(~).second = 7
    fa(10)
```

### Defect reports

Os seguintes defect reports que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1541](<https://cplusplus.github.io/CWG/issues/1541.html>) | C++98 | expression não podia ser omitida se o tipo de retorno fosse void cv-qualificado | pode ser omitida
[CWG 1579](<https://cplusplus.github.io/CWG/issues/1579.html>) | C++11 | retorno por converting move constructor não era permitido | busca por converting move constructor habilitada
[CWG 1885](<https://cplusplus.github.io/CWG/issues/1885.html>) | C++98 | sequenciamento da destruição de variáveis automáticas não era explícito | regras de sequenciamento adicionadas

### Veja também

*   [copy elision](<#/doc/language/copy_elision>)

[Documentação C](<#/>) para a instrução `return`
---
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa defect report contra essa revisão