# std::literals::complex_literals::operator""i, operator""if, operator""il

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
constexpr complex<double> operator""i( long double arg );
constexpr complex<double> operator""i( unsigned long long arg );
constexpr complex<float> operator""if( long double arg );
constexpr complex<float> operator""if( unsigned long long arg );
constexpr complex<long double> operator""il( long double arg );
constexpr complex<long double> operator""il( unsigned long long arg );
```

Forma um literal [std::complex](<#/doc/numeric/complex>) que representa um número imaginário.

1) Forma um literal [std::complex](<#/doc/numeric/complex>)&lt;double&gt; com a parte real zero e a parte imaginária arg.

2) Forma um literal [std::complex](<#/doc/numeric/complex>)&lt;float&gt; com a parte real zero e a parte imaginária arg.

3) Forma um literal [std::complex](<#/doc/numeric/complex>)&lt;long double&gt; com a parte real zero e a parte imaginária arg.

### Parâmetros

- **arg** — o valor do número imaginário

### Valor de retorno

O literal [std::complex](<#/doc/numeric/complex>) com a parte real zero e a parte imaginária arg.

### Observações

Esses operadores são declarados no namespace std::literals::complex_literals, onde tanto `literals` quanto `complex_literals` são inline namespaces. O acesso a esses operadores pode ser obtido com qualquer um dos seguintes:

*   using namespace std::literals,
*   using namespace std::complex_literals, ou
*   using namespace std::literals::complex_literals.

Embora `if` seja uma [palavra-chave](<#/doc/keywords/if>) em C++, ele é um sufixo ud de um [operador literal](<#/doc/language/user_literal>) na forma operator ""if e em expressões literais como 1if ou 1.0if porque não é separado por espaço em branco e não é um token autônomo.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_complex_udls`](<#/doc/feature_test>) | [`201309L`](<#/>) | (C++14) | Literais Definidos pelo Usuário para [std::complex](<#/doc/numeric/complex>)

### Possível implementação

[operator""i](<#/doc/numeric/complex/operator_q__q_i>)
---
```cpp
    constexpr std::complex<double> operator""i(unsigned long long d)
    {
        return std::complex<double> {0.0, static_cast<double>(d)};
    }
    
    constexpr std::complex<double> operator""i(long double d)
    {
        return std::complex<double> {0.0, static_cast<double>(d)};
    }
```

[operator""if](<#/doc/numeric/complex/operator_q__q_i>)
```cpp
    constexpr std::complex<float> operator""if(unsigned long long d)
    {
        return std::complex<float> {0.0f, static_cast<float>(d)};
    }
    
    constexpr std::complex<float> operator""if(long double d)
    {
        return std::complex<float> {0.0f, static_cast<float>(d)};
    }
```

[operator""il](<#/doc/numeric/complex/operator_q__q_i>)
```cpp
    constexpr std::complex<long double> operator""il(unsigned long long d)
    {
        return std::complex<long double> {0.0L, static_cast<long double>(d)};
    }
    
    constexpr std::complex<long double> operator""il(long double d)
    {
        return std::complex<long double> {0.0L, d};
    }
```

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        using namespace std::complex_literals;
    
        std::complex<double> c = 1.0 + 1i;
        std::cout << "abs" << c << " = " << std::abs(c) << '\n';
    
        std::complex<float> z = 3.0f + 4.0if;
        std::cout << "abs" << z << " = " << std::abs(z) << '\n';
    }
```

Saída:
```
    abs(1,1) = 1.41421
    abs(3,4) = 5
```

### Veja também

[ (constructor)](<#/doc/numeric/complex/complex>) | constrói um número complexo
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[Documentação C](<#/>) para I