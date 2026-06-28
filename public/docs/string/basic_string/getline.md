# std::getline

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class CharT, class Traits, class Allocator >
std::basic_istream<CharT, Traits>&
getline( std::basic_istream<CharT, Traits>& input,
std::basic_string<CharT, Traits, Allocator>& str, CharT delim );
template< class CharT, class Traits, class Allocator >
std::basic_istream<CharT, Traits>&
getline( std::basic_istream<CharT, Traits>&& input,
std::basic_string<CharT, Traits, Allocator>& str, CharT delim );
template< class CharT, class Traits, class Allocator >
std::basic_istream<CharT, Traits>&
getline( std::basic_istream<CharT, Traits>& input,
std::basic_string<CharT, Traits, Allocator>& str );
template< class CharT, class Traits, class Allocator >
std::basic_istream<CharT, Traits>&
getline( std::basic_istream<CharT, Traits>&& input,
std::basic_string<CharT, Traits, Allocator>& str );
```

`getline` lê caracteres de um stream de entrada e os coloca em uma string:

1,2) Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que input.gcount() não é afetado. Após construir e verificar o objeto sentry, executa o seguinte:

1) Chama str.erase().

2) Extrai caracteres de input e os anexa a str até que uma das seguintes condições ocorra (verificadas na ordem listada)

a) condição de fim de arquivo em input, caso em que, `getline` define [`eofbit`](<#/doc/io/ios_base/iostate>).

b) o próximo caractere de entrada disponível é delim, conforme testado por Traits::eq(c, delim), caso em que o caractere delimitador é extraído de input, mas não é anexado a str.

c) str.max_size() caracteres foram armazenados, caso em que `getline` define [`failbit`](<#/doc/io/ios_base/iostate>) e retorna.

3) Se nenhum caractere foi extraído por qualquer motivo (nem mesmo o delimitador descartado), `getline` define [`failbit`](<#/doc/io/ios_base/iostate>) e retorna.

3,4) O mesmo que getline(input, str, input.widen('\n')), ou seja, o delimitador padrão é o caractere de fim de linha.

### Parâmetros

- **input** — o stream de onde obter os dados
- **str** — a string onde colocar os dados
- **delim** — o caractere delimitador

### Valor de retorno

input

### Observações

Ao consumir entrada delimitada por espaços em branco (por exemplo, int n; [std::cin](<#/doc/io/cin>) >> n;), qualquer espaço em branco que se segue, incluindo um caractere de nova linha, será deixado no stream de entrada. Então, ao mudar para entrada orientada a linha, a primeira linha recuperada com `getline` será apenas esse espaço em branco. No caso provável de que este seja um comportamento indesejado, as soluções possíveis incluem:

*   Uma chamada inicial explícita e extrínseca a `getline`.
*   Removendo espaços em branco consecutivos com [std::cin](<#/doc/io/cin>) >> [std::ws](<#/doc/io/manip/ws>).
*   Ignorando todos os caracteres restantes na linha de entrada com cin.ignore([std::numeric_limits](<#/doc/types/numeric_limits>)<[std::streamsize](<#/doc/io/streamsize>)>::max(), '\n');.

### Exemplo

O exemplo a seguir demonstra como usar a função `getline` para ler a entrada do usuário e para processar um stream linha por linha, ou por partes de uma linha usando o parâmetro delim.

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        // cumprimenta o usuário
        std::string name;
        std::cout << "What is your name? ";
        std::getline(std::cin, name);
        std::cout << "Hello " << name << ", nice to meet you.\n";
     
        // lê o arquivo linha por linha
        std::istringstream input;
        input.str("1\n2\n3\n4\n5\n6\n7\n");
        int sum = 0;
        for (std::string line; std::getline(input, line);)
            sum += std::stoi(line);
        std::cout << "\nThe sum is " << sum << ".\n\n";
     
        // usa separador para ler partes da linha
        std::istringstream input2;
        input2.str("a;b;c;d");
        for (std::string line; std::getline(input2, line, ';');)
            std::cout << line << '\n';
    }
```

Saída possível:
```
    What is your name? John Q. Public
    Hello John Q. Public, nice to meet you.
     
    The sum is 28.
     
    a
    b
    c
    d
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 91](<https://cplusplus.github.io/LWG/issue91>) | C++98 | `getline` não se comportava como uma função de entrada não formatada | comporta-se como uma função de entrada não formatada

### Veja também

[ getline](<#/doc/io/basic_istream/getline>) | extrai caracteres até que o caractere fornecido seja encontrado
(função membro pública de `std::basic_istream<CharT,Traits>`)
---