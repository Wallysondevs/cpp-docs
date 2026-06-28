# std::basic_ios&lt;CharT,Traits&gt;::tie

[std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>* tie() const; | (1) |
---|---|---
[std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>* tie( [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>* str ); | (2) |

Gerencia o stream vinculado. Um stream vinculado é um stream de saída que é sincronizado com a sequência controlada pelo stream buffer ([rdbuf()](<#/doc/io/basic_ios/rdbuf>)), ou seja, flush() é chamado no stream vinculado antes de qualquer operação de entrada/saída em *this.

1) Retorna o stream vinculado atual. Se não houver stream vinculado, um ponteiro nulo é retornado.

2) Define o stream vinculado atual como str. Retorna o stream vinculado antes da operação. Se não houver stream vinculado, um ponteiro nulo é retornado. Se str não for nulo e tie() for alcançável atravessando a lista encadeada de objetos de stream vinculados começando de str->tie(), o comportamento é indefinido.

### Parâmetros

- **str** — um stream de saída para definir como o stream vinculado

### Valor de retorno

O stream vinculado, ou um ponteiro nulo se não houver stream vinculado.

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

Por padrão, o stream padrão [std::cout](<#/doc/io/cout>) é vinculado a [std::cin](<#/doc/io/cin>) e [std::cerr](<#/doc/io/cerr>). Da mesma forma, sua contraparte wide [std::wcout](<#/doc/io/cout>) é vinculada a [std::wcin](<#/doc/io/cin>) e [std::wcerr](<#/doc/io/cerr>).

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::ofstream os("test.txt");
        std::ifstream is("test.txt");
        std::string value("0");
    
        os << "Hello";
        is >> value;
    
        std::cout << "Result before tie(): " << std::quoted(value) << "\n";
        is.clear();
        is.tie(&os);
    
        is >> value;
    
        std::cout << "Result after tie(): " << std::quoted(value) << "\n";
    }
```

Saída:
```
    Result before tie(): "0"
    Result after tie(): "Hello"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 835](<https://cplusplus.github.io/LWG/issue835>) | C++98 | dois streams poderiam ser vinculados um ao outro[1](<#/doc/io/basic_ios/tie>) (direta ou indiretamente através de outro objeto de stream intermediário) | o comportamento é indefinido neste caso

1. [↑](<#/doc/io/basic_ios/tie>) [`std::basic_ostream::flush()`](<#/doc/io/basic_ostream/flush>) é uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>), então ela cria um objeto sentinela enquanto é chamada. Quando `flush()` é chamado em um objeto de stream, o [construtor do objeto sentinela](<#/doc/io/basic_ostream/sentry>) chamará `flush()` em seu stream vinculado, e esse `flush()` construirá outro objeto sentinela e seu construtor chamará `flush()` no stream vinculado desse stream e assim por diante. Portanto, se os streams a e b estiverem (direta ou indiretamente) vinculados um ao outro, chamar a.flush() eventualmente chamará b.flush(), que eventualmente chamará a.flush(), e resultará em um loop infinito.
