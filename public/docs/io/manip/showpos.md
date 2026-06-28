# std::showpos, std::noshowpos

Definido no header `[<ios>](<#/doc/header/ios>)`

```cpp
std::ios_base& showpos( std::ios_base& str );  // (1)
std::ios_base& noshowpos( std::ios_base& str );  // (2)
```

  
Habilita ou desabilita a exibição do sinal de mais '+' na saída de inteiros não negativos. Não tem efeito na entrada.

1) Habilita a flag `showpos` no stream str como se chamasse str.setf([std::ios_base::showpos](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita a flag `showpos` no stream str como se chamasse str.unsetf([std::ios_base::showpos](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S, pode ser chamado com uma expressão como `out << std::showpos` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::showpos` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

str  |  \-  |  referência para stream de E/S   
  
### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```
    #include <iostream>
     
    int main()
    {
        std::cout
            << "showpos: " << std::showpos << 42 << ' ' << 3.14 << ' ' << 0 << '\n'
            << "noshowpos: " << std::noshowpos << 42 << ' ' << 3.14 << ' ' << 0 << '\n';
    }
```

Saída: 
```
    showpos: +42 +3.14 +0
    noshowpos: 42 3.14 0
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) |  limpa as flags `ios_base` especificadas   
(função)  
[ setiosflags](<#/doc/io/manip/setiosflags>) |  define as flags `ios_base` especificadas   
(função)