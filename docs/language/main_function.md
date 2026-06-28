# Função main

Um programa deve conter uma função global chamada main, que é o início designado do programa em um ambiente hospedado. Ela deve ter uma das seguintes formas:

---
int`main() {` body `}` | (1) |
---|---|---
int`main(` int argc`,` char* argv`[]`) {` body `}` | (2) |
int`main(` /* implementation-defined */`) {` body `}` | (3) |

1) Uma função `main` executando independentemente de argumentos fornecidos pelo ambiente.

2) Uma função `main` aceitando argumentos fornecidos pelo ambiente.

Os nomes de argc e argv são arbitrários, assim como a representação dos tipos dos parâmetros: int main(int ac, char** av) é igualmente válido.

3) Uma função `main` de tipo definido pela implementação, retornando int.

O padrão C++ recomenda que funções `main` definidas pela implementação coloquem os parâmetros extras (opcionais) após argv.

- **argc** — Valor não negativo representando o número de argumentos passados para o programa a partir do ambiente em que o programa é executado.
- **argv** — Ponteiro para o primeiro elemento de um array de argc + 1 ponteiros, dos quais o último é nulo e os anteriores, se houver, apontam para [strings multibyte terminadas em nulo](<#/doc/string/multibyte>) que representam os argumentos passados para o programa a partir do ambiente de execução. Se argv[0] não for um ponteiro nulo (ou, equivalentemente, se argc > 0), ele aponta para uma string que representa o nome usado para invocar o programa, ou para uma string vazia.
- **body** — O corpo da função `main`.

### Explicação

A função `main` é chamada na inicialização do programa após a [inicialização](<#/doc/language/initialization>) dos objetos não-locais com [duração de armazenamento](<#/doc/language/storage_duration>) estática. É o ponto de entrada designado para um programa que é executado em um ambiente _hospedado_ (ou seja, com um sistema operacional). Os pontos de entrada para programas _autônomos_ (boot loaders, kernels de SO, etc.) são definidos pela implementação.

Os parâmetros da forma de dois parâmetros da função `main` permitem que strings de caracteres multibyte arbitrárias sejam passadas do ambiente de execução (estas são tipicamente conhecidas como _argumentos de linha de comando_), os ponteiros argv[1] .. argv[argc - 1] apontam para os primeiros caracteres em cada uma dessas strings. argv[0] (se não nulo) é o ponteiro para o caractere inicial de uma string multibyte terminada em nulo que representa o nome usado para invocar o próprio programa (ou uma string vazia "" se isso não for suportado pelo ambiente de execução). As strings são modificáveis, embora essas modificações não se propaguem de volta para o ambiente de execução: elas podem ser usadas, por exemplo, com [std::strtok](<#/doc/string/byte/strtok>). O tamanho do array apontado por argv é de pelo menos argc + 1, e o último elemento, argv[argc], é garantido ser um ponteiro nulo.

A função `main` possui as seguintes propriedades especiais:

1) O corpo da função `main` não precisa conter a [instrução return](<#/doc/language/return>): se o controle atingir o final de `main` sem encontrar uma instrução return, o efeito é o de executar return 0;.

2) A execução do return (ou o return implícito ao atingir o final de `main`) é equivalente a primeiro sair da função normalmente (o que destrói os objetos com duração de armazenamento automática) e então chamar [std::exit](<#/doc/utility/program/exit>) com o mesmo argumento que o argumento do [return](<#/doc/language/return>) ([std::exit](<#/doc/utility/program/exit>) então destrói objetos estáticos e encerra o programa).

A função `main` possui várias restrições (cuja violação torna o programa malformado):

1) Não pode ser [nomeada](<#/doc/language/definition>) em nenhum lugar do programa

a) em particular, não pode ser chamada recursivamente

b) seu endereço não pode ser obtido

c) não pode ser usada em uma expressão [`typeid`](<#/doc/language/typeid>) ou em um especificador [`decltype`](<#/doc/language/decltype>) (desde C++11)

2) Não pode ser predefinida e não pode ser sobrecarregada: efetivamente, o nome `main` no namespace global é reservado para funções (embora possa ser usado para nomear classes, namespaces, enumerações e qualquer entidade em um namespace não global, exceto que uma entidade nomeada `main` não pode ser declarada com [ligação de linguagem](<#/doc/language/language_linkage>) C em qualquer namespace).

3) Não pode ser definida como deleted ou (desde C++11) declarada com qualquer ligação de linguagem, [`constexpr`](<#/doc/language/constexpr>) (desde C++11), [`consteval`](<#/doc/language/consteval>) (desde C++20), [`inline`](<#/doc/language/inline>), ou [`static`](<#/doc/language/static>).

4) O tipo de retorno da função `main` não pode ser deduzido (auto main() {...} não é permitido). | (desde C++14)
---|---
5) A função `main` não pode ser uma [coroutine](<#/doc/language/coroutines>). | (desde C++20)
6) A função `main` não pode ser anexada a um [módulo](<#/doc/language/modules>) nomeado. | (desde C++20)

### Notas

Se a função `main` for definida com um [bloco try de função](<#/doc/language/try>), as exceções lançadas pelos destrutores de objetos estáticos (que são destruídos pelo [std::exit](<#/doc/utility/program/exit>) implícito) não são [capturadas](<#/doc/language/catch>) por ele.

A maneira pela qual os argumentos fornecidos na linha de comando do SO são convertidos nos arrays de caracteres multibyte referenciados por argv pode envolver processamento definido pela implementação:

* [Parsing C++ Command-Line Arguments](<https://docs.microsoft.com/en-us/cpp/cpp/main-function-command-line-args>) MSDN
* [Shell Introduction](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18_01>) POSIX

Uma forma muito comum de main() definida pela implementação possui um terceiro argumento (além de `argc` e `argv`), do tipo char**, apontando para [um array de ponteiros para as variáveis de ambiente de execução](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/exec.html>).

### Exemplo

Demonstra como informar a um programa onde encontrar sua entrada e onde escrever seus resultados.
Uma possível invocação: ./convert table_in.dat table_out.dat

Execute este código
```cpp
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    
    int main(int argc, char *argv[])
    {
        std::cout << "argc == " << argc << '\n';
    
        for (int ndx{}; ndx != argc; ++ndx)
            std::cout << "argv[" << ndx << "] == " << std::quoted(argv[ndx]) << '\n';
        std::cout << "argv[" << argc << "] == "
                  << static_cast<void*>(argv[argc]) << '\n';
    
        /* ... */
    
        return argc == 3 ? EXIT_SUCCESS : EXIT_FAILURE; // optional return value
    }
```

Saída possível:
```
    argc == 3
    argv[0] == "./convert"
    argv[1] == "table_in.dat"
    argv[2] == "table_out.dat"
    argv[3] == 0
```

### Referências

Conteúdo estendido
---

* Padrão C++23 (ISO/IEC 14882:2024):

  * 6.9.3.1 função main [basic.start.main]

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1003](<https://cplusplus.github.io/CWG/issues/1003.html>) | C++98 | nomes de parâmetros suportados de `main` eram excessivamente restritos | todos os nomes de parâmetros válidos são suportados
[CWG 1886](<https://cplusplus.github.io/CWG/issues/1886.html>) | C++98 | a função `main` poderia ser declarada com uma ligação de linguagem | proibido
[CWG 2479](<https://cplusplus.github.io/CWG/issues/2479.html>) | C++20 | a função `main` poderia ser declarada consteval | proibido
[CWG 2811](<https://cplusplus.github.io/CWG/issues/2811.html>) | C++98 | se a função `main` é usada após [N3214](<https://wg21.link/N3214>) não estava claro | é considerada usada quando nomeada

### Veja também

[Documentação C](<#/>) para a função `main`
---