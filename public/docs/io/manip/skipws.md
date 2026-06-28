# std::skipws, std::noskipws

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& skipws( std::ios_base& str );
std::ios_base& noskipws( std::ios_base& str );
```

Habilita ou desabilita a omissão de espaços em branco iniciais pelas funções de entrada formatada (habilitado por padrão). Não tem efeito na saída.

1) Habilita o flag `skipws` no stream str como se chamasse str.setf([std::ios_base::skipws](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita o flag `skipws` no stream str como se chamasse str.unsetf([std::ios_base::skipws](<#/doc/io/ios_base/fmtflags>)).

A omissão de espaços em branco é realizada pelo construtor de [std::basic_istream::sentry](<#/doc/io/basic_istream/sentry>), que lê e descarta os caracteres classificados como espaço em branco pelo facet [std::ctype](<#/doc/locale/ctype>) do locale imbuído do stream.

Este é um manipulador de E/S, ele pode ser chamado com uma expressão como out << std::noskipws para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como in >> std::noskipws para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        char c1, c2, c3;
        std::istringstream("a b c") >> c1 >> c2 >> c3;
        std::cout << "Default  behavior:"
                     " c1 = " << c1 << 
                     " c2 = " << c2 << 
                     " c3 = " << c3 << '\n';
        std::istringstream("a b c") >> std::noskipws >> c1 >> c2 >> c3;
        std::cout << "noskipws behavior:" 
                     " c1 = " << c1 <<
                     " c2 = " << c2 <<
                     " c3 = " << c3 << '\n';
    }
```

Saída:
```
    Default  behavior: c1 = a c2 = b c3 = c
    noskipws behavior: c1 = a c2 =   c3 = b
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa os flags ios_base especificados
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define os flags `ios_base` especificados
(função)
[ ws](<#/doc/io/manip/ws>) | consome espaços em branco
(modelo de função)