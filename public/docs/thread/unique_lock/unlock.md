# std::unique_lock&lt;Mutex&gt;::unlock

```cpp
void unlock();
```
| | (desde C++11)

Desbloqueia (isto é, libera a posse de) o mutex associado.

Uma [std::system_error](<#/doc/error/system_error>) é lançada se não houver mutex associado ou se o mutex não estiver bloqueado.

### Parameters

(nenhum)

### Return value

(nenhum)

### Exceptions

Se não houver mutex associado ou o mutex não estiver bloqueado, uma [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>).

### Example

| Esta seção está incompleta
Reason: nenhum exemplo

### See also

[ lock](<#/doc/thread/unique_lock/lock>) | bloqueia (isto é, assume a posse de) o mutex associado
(função membro pública)
[ release](<#/doc/thread/unique_lock/release>) | desassocia o mutex associado sem desbloqueá-lo (isto é, liberar a posse dele)
(função membro pública)