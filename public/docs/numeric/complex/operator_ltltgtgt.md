# operator&lt;&lt;,&gt;&gt;(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T, class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::complex<T>& x );
template< class T, class CharT, class Traits >
std::basic_istream<CharT, Traits>&
operator>>( std::basic_istream<CharT, Traits>& is, std::complex<T>& x );
```

1) Escreve em os o número complexo no formato (real, imaginário).

2) Lê um número complexo de is. Os formatos suportados são

  * real
  * (real)
  * (real, imaginário)

onde a entrada para real e imaginário deve ser conversível para T.

Se ocorrer um erro, chama is.setstate(ios_base::failbit).

### Exceções

Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) em erros de stream.

### Parâmetros

- **os** — um stream de saída de caracteres
- **is** — um stream de entrada de caracteres
- **x** — o número complexo a ser inserido ou extraído

### Valor de retorno

1) os

2) is

### Observações

1) Como a vírgula pode ser usada na localidade atual como separador decimal, a saída pode ser ambígua. Isso pode ser resolvido com [std::showpoint](<#/doc/io/manip/showpoint>) que força o separador decimal a ser visível.

2) A entrada é realizada como uma série de extrações formatadas simples. A omissão de espaços em branco é a mesma para cada uma delas.

### Possível implementação
```cpp
    template<class T, class CharT, class Traits>
    basic_ostream<CharT, Traits>&
        operator<<(basic_ostream<CharT, Traits>& o, const complex<T>& x)
    {
        basic_ostringstream<CharT, Traits> s;
        s.flags(o.flags());
        s.imbue(o.getloc());
        s.precision(o.precision());
        s << '(' << x.real() << ',' << x.imag() << ')';
        return o << s.str();
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::complex<double> {3.14, 2.71} << '\n';
    }
```

Saída possível:
```
    (3.14,2.71)
```