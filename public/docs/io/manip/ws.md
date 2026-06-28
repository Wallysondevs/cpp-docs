# std::ws

Definido no cabeçalho `[<istream>](<#/doc/header/istream>)`

```c
template< class CharT, class Traits >
std::basic_istream<CharT, Traits>& ws( std::basic_istream<CharT, Traits>& is );
```

Descarta espaços em branco iniciais de um fluxo de entrada.

Comporta-se como uma [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que is.gcount() não é modificado. Após construir e verificar o objeto sentry, extrai caracteres do fluxo e os descarta até que uma das seguintes condições ocorra:

*   a condição de fim de arquivo ocorre na sequência de entrada (nesse caso, a função chama setstate(eofbit) mas não define `failbit`; isso não se aplica se o `eofbit` já estiver definido em is antes da chamada para `ws`, caso em que a construção do objeto sentry definiria `failbit`).

*   o próximo caractere disponível c na sequência de entrada não é um espaço em branco, conforme determinado por [std::isspace](<#/doc/string/byte/isspace>)(c, is.getloc()). O caractere não-espaço em branco não é extraído.

Este é um manipulador de E/S (I/O) somente de entrada, ele pode ser chamado com uma expressão como `in >> std::ws` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **is** — referência para fluxo de entrada

### Valor de retorno

is (referência para o fluxo após a extração de espaços em branco consecutivos).

### Observações

Se `eofbit` estiver definido no fluxo antes da chamada, a construção do objeto sentry definirá `failbit`.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <istream>
    #include <sstream>
    #include <string>
    
    int main()
    {
        for (const char* str : {"     #1 test", "\t #2 test", "#3 test"})
        {
            std::string line;
            std::getline(std::istringstream{str}, line);
            std::cout << "getline returns:\t" << std::quoted(line) << '\n';
    
            std::istringstream iss{str};
            std::getline(iss >> std::ws, line);
            std::cout << "ws + getline returns:\t" << std::quoted(line) << '\n';
        }
    }
```

Saída:
```
    getline returns:	"     #1 test"
    ws + getline returns:	"#1 test"
    getline returns:	"	 #2 test"
    ws + getline returns:	"#2 test"
    getline returns:	"#3 test"
    ws + getline returns:	"#3 test"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 415](<https://cplusplus.github.io/LWG/issue415>) | C++98 | chamar `std::ws` pode não construir o objeto sentry (inconsistente com outras funções de entrada) | exigido para construir o objeto sentry

### Veja também

[ ignore](<#/doc/io/basic_istream/ignore>) | extrai e descarta caracteres até que o caractere fornecido seja encontrado
(função membro pública de `std::basic_istream<CharT,Traits>`)