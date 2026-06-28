# std::boolalpha, std::noboolalpha

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& boolalpha( std::ios_base& str );
std::ios_base& noboolalpha( std::ios_base& str );
```

1) Habilita a flag `boolalpha` no stream str como se chamasse str.setf([std::ios_base::boolalpha](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita a flag `boolalpha` no stream str como se chamasse str.unsetf([std::ios_base::boolalpha](<#/doc/io/ios_base/fmtflags>)).

`std::boolalpha` é um manipulador de E/S, então pode ser chamado com uma expressão como `out << std::boolalpha` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::boolalpha` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        // boolalpha output
        std::cout << "default true: " << true << '\n'
                  << "default false: " << false << '\n'
                  << std::boolalpha 
                  << "boolalpha true: " << true << '\n'
                  << "boolalpha false: " << false << '\n'
                  << std::noboolalpha 
                  << "noboolalpha true: " << true << '\n'
                  << "noboolalpha false: " << false << '\n';
     
        // boolalpha parse
        bool b1, b2;
        std::istringstream is("true false");
        is >> std::boolalpha >> b1 >> b2;
     
        std::cout << '"' << is.str() << "\" parsed as: "
                  << std::boolalpha << b1 << ' ' << b2 << '\n';
    }
```

Saída:
```
    default true: 1
    default false: 0
    boolalpha true: true
    boolalpha false: false
    noboolalpha true: 1
    noboolalpha false: 0
    "true false" parsed as: true false
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa as flags ios_base especificadas
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define as flags `ios_base` especificadas
(função)
[ do_truenamedo_falsename](<#/doc/locale/numpunct/truefalsename>)[virtual] | fornece a string a ser usada como nome para os booleanos true e false
(função membro virtual protegida de `std::numpunct<CharT>`)