# std::promise&lt;R&gt;::~promise

```cpp
~promise();  // (desde C++11)
```

  
Abandona o estado compartilhado: 

  * se o estado compartilhado estiver pronto, o [libera](<#/doc/thread/promise>). 
  * se o estado compartilhado não estiver pronto, armazena um objeto de exceção do tipo [std::future_error](<#/doc/thread/future_error>) com uma condição de erro [std::future_errc::broken_promise](<#/doc/thread/future_errc>), torna o estado compartilhado pronto e o libera. 
