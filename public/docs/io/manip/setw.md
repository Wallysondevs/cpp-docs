# std::setw

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
/* unspecified */ setw( int n );
```

Quando usado em uma expressão `out << std::setw(n)` ou `in >> std::setw(n)`, define o parâmetro `width` do stream `out` ou `in` para exatamente `n`.

Algumas operações redefinem a largura para zero (veja [abaixo](<#/doc/io/manip/setw>)), então `std::setw` pode precisar ser chamado repetidamente para definir a largura para múltiplas operações.

### Parâmetros

- **n** — novo valor para width

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `out` for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << setw(n)`
    *   tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    *   tem o valor `out`
    *   se comporta como se chamasse `f(out, n)`
*   se `in` for um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão `in >> setw(n)`
    *   tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    *   tem o valor `in`
    *   se comporta como se chamasse `f(in, n)`

onde a função `f` é definida como:
```cpp
    void f(std::ios_base& str, int n)
    {
        // define a largura
        str.width(n);
    }
```

### Observações

A propriedade `width` do stream será redefinida para zero (significando "não especificado") se qualquer uma das seguintes funções for chamada:

*   Entrada

    *   [`operator>>(basic_istream&, basic_string&)`](<#/doc/string/basic_string/operator_ltltgtgt>)
    *   [`operator>>(basic_istream&, char*)`](<#/doc/io/basic_istream/operator_gtgt2>)

*   Saída

    *   Sobrecargas de [`basic_ostream::operator<<()`](<#/doc/io/basic_ostream/operator_ltlt>) que aceitam tipos aritméticos ou ponteiros void (no Estágio 3 de [`num_put::put()`](<#/doc/locale/num_put/put>))
    *   [`operator<<(basic_ostream&, char)`](<#/doc/io/basic_ostream/operator_ltlt2>) e [`operator<<(basic_ostream&, char*)`](<#/doc/io/basic_ostream/operator_ltlt2>)
    *   [`operator<<(basic_ostream&, basic_string&)`](<#/doc/string/basic_string/operator_ltltgtgt>)
    *   [std::put_money](<#/doc/io/manip/put_money>) (dentro de [`money_put::put()`](<#/doc/locale/money_put/put>))
    *   [std::quoted](<#/doc/io/manip/quoted>) (quando usado com um stream de saída)

Os efeitos exatos que este modificador tem na entrada e saída variam entre as funções de E/S individuais e são descritos em cada página de sobrecarga de `operator<<` e `operator>>` individualmente.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::cout << "no setw: [" << 42 << "]\n"
                  << "setw(6): [" << std::setw(6) << 42 << "]\n"
                  << "no setw, several elements: [" << 89 << 12 << 34 << "]\n"
                  << "setw(6), several elements: [" << 89 << std::setw(6) << 12 << 34 << "]\n";
     
        std::istringstream is("hello, world");
        char arr[10];
     
        is >> std::setw(6) >> arr;
        std::cout << "Input from \"" << is.str() << "\" with setw(6) gave \""
                  << arr << "\"\n";
    }
```

Saída:
```
    no setw: [42]
    setw(6): [    42]
    no setw, several elements: [891234]
    setw(6), several elements: [89    1234]
    Input from "hello, world" with setw(6) gave "hello"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98 | `setw` só podia ser usado com streams do tipo [std::ostream](<#/doc/io/basic_ostream>) ou [std::istream](<#/doc/io/basic_istream>) | utilizável com qualquer stream de caracteres

### Veja também

[ width](<#/doc/io/ios_base/width>) | gerencia a largura do campo
(função membro pública de `std::ios_base`)
[ setfill](<#/doc/io/manip/setfill>) | altera o caractere de preenchimento
(modelo de função)
[ internalleftright](<#/doc/io/manip/left>) | define o posicionamento dos caracteres de preenchimento
(função)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se um prefixo é usado para indicar a base numérica
(função)