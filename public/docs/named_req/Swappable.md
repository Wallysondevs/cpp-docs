# Requisitos nomeados C++: Swappable

Qualquer lvalue ou rvalue deste tipo pode ser trocado com qualquer lvalue ou rvalue de algum outro tipo, usando a chamada de função não qualificada `swap()` no contexto onde ambos [std::swap](<#/doc/utility/swap>) e os `swap()`s definidos pelo usuário são visíveis.

### Requisitos

O tipo U é Swappable com o tipo T se, para qualquer objeto u do tipo U e qualquer objeto t do tipo T,

Expressão | Requisitos | Semântica
#include &lt;algorithm&gt; // until C++11
#include &lt;utility&gt; // since C++11
using [std::swap](<#/doc/algorithm/swap>);
swap(u, t); | Após a chamada, o valor de `t` é o valor mantido por `u` antes da chamada, e o valor de `u` é o valor mantido por `t` antes da chamada. | Chama a função nomeada swap() encontrada por resolução de sobrecarga entre todas as funções com esse nome que são encontradas por [argument-dependent lookup](<#/doc/language/adl>) e os dois templates [std::swap](<#/doc/utility/swap>) definidos no header [`<algorithm>`](<#/doc/header/algorithm>)(até C++11)[`<utility>`](<#/doc/header/utility>)(desde C++11).
#include &lt;algorithm&gt; // until C++11
#include &lt;utility&gt; // since C++11
using [std::swap](<#/doc/algorithm/swap>);
swap(t, u); | Mesmo | Mesmo

Muitas funções da standard library (por exemplo, muitos algoritmos) esperam que seus argumentos satisfaçam Swappable, o que significa que sempre que a standard library realiza uma troca, ela usa o equivalente a `using [std::swap](<#/doc/algorithm/swap>); swap(t, u);`.

Implementações típicas ou

1) Definem um swap não-membro no namespace envolvente, que pode encaminhar para um swap membro se o acesso a membros de dados não-públicos for necessário.

2) Definem uma [friend function](<#/doc/language/friend>) na classe (esta abordagem oculta o swap específico da classe da pesquisa de nomes, exceto para ADL).

### Notas

Não é especificado se [`<algorithm>`](<#/doc/header/algorithm>)(até C++11)[`<utility>`](<#/doc/header/utility>)(desde C++11) é realmente incluído quando as funções da standard library realizam a troca, portanto, o swap() fornecido pelo usuário não deve esperar que ele seja incluído.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    struct IntVector
    {
        std::vector<int> v;
    
        IntVector& operator=(IntVector) = delete; // not assignable
    
        void swap(IntVector& other)
        {
            v.swap(other.v);
        }
    
        void operator()(auto rem, auto term = " ")
        {
            std::cout << rem << "{{";
            for (int n{}; int e : v)
                std::cout << (n++ ? ", " : "") << e;
            std::cout << "}}" << term;
        }
    };
    
    void swap(IntVector& v1, IntVector& v2)
    {
        v1.swap(v2);
    }
    
    int main()
    {
        IntVector v1{{1, 1, 1, 1}}, v2{{2222, 2222}};
    
        auto prn = [&]{ v1("v1", ", "), v2("v2", ";\n"); };
    
    //  std::swap(v1, v2); // Compiler error! std::swap requires MoveAssignable
        prn();
        std::iter_swap(&v1, &v2); // OK: library calls unqualified swap()
        prn();
        std::ranges::swap(v1, v2); // OK: library calls unqualified swap()
        prn();
    }
```

Saída:
```
    v1{{1, 1, 1, 1}}, v2{{2222, 2222}};
    v1{{2222, 2222}}, v2{{1, 1, 1, 1}};
    v1{{1, 1, 1, 1}}, v2{{2222, 2222}};
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 226](<https://cplusplus.github.io/LWG/issue226>) | C++98 | não estava claro como a standard library usa `swap` | esclarecido para usar tanto `std::` quanto `swap` encontrado por ADL

### Veja também

[ is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable](<#/doc/types/is_swappable>)(C++17)(C++17)(C++17)(C++17) | verifica se objetos de um tipo podem ser trocados com objetos do mesmo tipo ou de tipos diferentes
(template de classe)
[ swappableswappable_with](<#/doc/concepts/swappable>)(C++20) | especifica que um tipo pode ser trocado ou que dois tipos podem ser trocados entre si
(concept)
*[_(as is)_]: A::pointer