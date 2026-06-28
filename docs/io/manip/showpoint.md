# std::showpoint, std::noshowpoint

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& showpoint( std::ios_base& str );
std::ios_base& noshowpoint( std::ios_base& str );
```

Habilita ou desabilita a inclusão incondicional do caractere de ponto decimal na saída de ponto flutuante. Não tem efeito na entrada.

1) Habilita o flag `showpoint` no fluxo str como se chamasse str.setf([std::ios_base::showpoint](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita o flag `showpoint` no fluxo str como se chamasse str.unsetf([std::ios_base::showpoint](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S, pode ser chamado com uma expressão como `out << std::showpoint` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::showpoint` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

O caractere a ser usado como caractere de ponto decimal é determinado pela faceta numpunct do locale imbuído no fluxo no momento da saída, conforme descrito em [std::num_put::put](<#/doc/locale/num_put/put>).

### Parâmetros

- **str** — referência para fluxo de E/S

### Valor de retorno

str (referência para o fluxo após a manipulação).

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    int main()
    {
        std::cout << "1.0 with showpoint: " << std::showpoint << 1.0 << '\n'
                  << "1.0 with noshowpoint: " << std::noshowpoint << 1.0 << '\n';
    }
```

Saída:
```
    1.0 with showpoint: 1.00000
    1.0 with noshowpoint: 1
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa os flags ios_base especificados
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define os flags `ios_base` especificados
(função)