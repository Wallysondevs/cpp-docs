# std::chrono::operator+, std::chrono::operator- (std::chrono::month)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::month operator+( const std::chrono::month& m,
const std::chrono::months& ms ) noexcept;
constexpr std::chrono::month operator+( const std::chrono::months& ms,
const std::chrono::month& m ) noexcept;
constexpr std::chrono::month operator-( const std::chrono::month& m,
const std::chrono::months& ms ) noexcept;
constexpr std::chrono::months operator-( const std::chrono::month& m1,
const std::chrono::month& m2 ) noexcept;
```

1,2) Adiciona ms.count() meses a m. O valor do mês contido no resultado é calculado primeiro avaliando static_cast&lt;long long&gt;(unsigned(m)) + (ms.count() - 1), reduzindo-o módulo 12 para um inteiro no intervalo `[`​0​`, `11`]`, e então adicionando 1.

3) Subtrai ms.count() meses de m e retorna o resultado. Equivalente a return m + -ms;.

4) Se m1.ok() e m2.ok() forem ambos verdadeiros, retorna um valor std::chrono::months m tal que m.count() está no intervalo `[`​0​`, `11`]` e m2 + m == m1. Caso contrário, o valor retornado é não especificado.

### Valor de retorno

1-3) Um std::chrono::month contendo um valor de mês calculado conforme descrito acima.

4) Um std::chrono::months representando a distância entre m1 e m2.

### Observações

Enquanto o cálculo não causar overflow, (1-3) sempre retornam um mês válido, mesmo que m.ok() seja falso.

O resultado da subtração de dois valores `month` é uma duração do tipo std::chrono::months. Essa unidade de duração representa o comprimento do mês gregoriano médio, e a duração resultante não tem relação com o número de dias nos meses específicos representados pelos operandos. Por exemplo, [std::chrono::seconds](<#/doc/chrono/duration>)([std::chrono::April](<#/doc/chrono/month>) - [std::chrono::March](<#/doc/chrono/month>)) não é o número de segundos em Março (2678400s), mas 2629746s (30.436875 dias).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    
    int main()
    {
        std::chrono::month m{6};
    
        m = m + std::chrono::months(2);
        assert(m == std::chrono::month(8));
    
        m = m - std::chrono::months(3);
        assert(m == std::chrono::month(5));
    
        constexpr std::chrono::months ms = std::chrono::month(8) - std::chrono::month(6);
        static_assert(ms == std::chrono::months(2));
    }
```

### Veja também

[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/month/operator_inc_dec>) | incrementa ou decrementa o mês
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/month/operator_arith>) | adiciona ou subtrai um número de meses
(função membro pública)