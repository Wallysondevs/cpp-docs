# std::basic_ios&lt;CharT,Traits&gt;::swap

```cpp
protected:
void swap( basic_ios& other ) noexcept;  // (desde C++11)
```

  
Troca os estados de *this e other, exceto pelos objetos `rdbuf` associados. [rdbuf()](<#/doc/io/basic_ios/rdbuf>) e other.rdbuf() retornam os mesmos valores de antes da chamada.

Esta função swap é protegida: ela é chamada pelas funções membro swap das classes de stream derivadas, como [std::basic_ofstream](<#/doc/io/basic_ofstream>) ou [std::basic_istringstream](<#/doc/io/basic_istringstream>), que sabem como trocar corretamente os stream buffers associados.

### Parâmetros

other  |  \-  |  o objeto `basic_ios` com o qual trocar o estado   
  
### Veja também

[ move](<#/doc/io/basic_ios/move>)(C++11) |  move de outro [std::basic_ios](<#/doc/io/basic_ios>) exceto por `rdbuf`   
(função membro protegida)  