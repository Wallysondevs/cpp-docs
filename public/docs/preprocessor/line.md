# Informações de nome de arquivo e linha

Altera o número da linha do código-fonte e, opcionalmente, o nome do arquivo atual, no pré-processador.

### Sintaxe

---
`#line` lineno | (1) |
---|---|---
`#line` lineno `"` filename`"` | (2) |

### Explicação

1) Altera o número da linha atual do pré-processador para `lineno`. Expansões da macro `__LINE__` a partir deste ponto expandirão para `lineno` mais o número de linhas de código-fonte reais encontradas desde então.

2) Também altera o nome do arquivo atual do pré-processador para `filename`. Expansões da macro `__FILE__` a partir deste ponto produzirão `filename`.

Quaisquer tokens de pré-processamento (constantes de macro ou expressões) são permitidos como argumentos para `#line`, desde que se expandam para um inteiro decimal válido, opcionalmente seguido por uma string de caracteres válida.

`lineno` deve ser uma sequência de pelo menos um dígito decimal (o programa é malformado, caso contrário) e é sempre interpretado como decimal (mesmo que comece com `0`).

Se `lineno` for `0` ou maior que `32767`(ate C++11)`2147483647`(desde C++11), o comportamento é indefinido.

### Notas

Esta diretiva é usada por algumas ferramentas de geração automática de código que produzem arquivos-fonte C++ a partir de um arquivo escrito em outra linguagem. Nesse caso, as diretivas `#line` podem ser inseridas no arquivo C++ gerado, referenciando os números de linha e o nome do arquivo-fonte original (editável por humanos).

### Exemplo

Execute este código
```
    #include <cassert>
    #define FNAME "test.cc"
    int main()
    {
    #line 777 FNAME
            assert(2+2 == 5);
    }
```

Saída possível:
```
    test: test.cc:777: int main(): Assertion `2+2 == 5' failed.
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 15.7 Controle de linha [cpp.line]

* Padrão C++20 (ISO/IEC 14882:2020):

* 15.7 Controle de linha [cpp.line]

* Padrão C++17 (ISO/IEC 14882:2017):

* 19.4 Controle de linha [cpp.line]

* Padrão C++14 (ISO/IEC 14882:2014):

* 16.4 Controle de linha [cpp.line]

* Padrão C++11 (ISO/IEC 14882:2011):

* 16.4 Controle de linha [cpp.line]

* Padrão C++98 (ISO/IEC 14882:1998):

* 16.4 Controle de linha [cpp.line]

### Veja também

[ source_location](<#/doc/utility/source_location>)(C++20) | uma classe que representa informações sobre o código-fonte, como nomes de arquivo, números de linha e nomes de função
(classe)
[documentação C](<#/>) para Informações de nome de arquivo e linha